# IgnorePointer和AbortPointer忽略事件的原理和区别

## IgnorePointer的原理
::: info 
IgnorePointer是忽略事件，
即不对子级进行命中测试，自己的hitTest函数返回false导致父级的命中测试
结果也返回false<br>
总结：IgnorePointer把事件吸收掉，使其子组件不进行命中测试，父组件的命中测试(hitTest函数)返回false

AbsorbPointer是阻止事件（阻止其子组件的命中测试，自身还是会命中测试）
子组件不进行命中测试，自己通过判断点击的位置，来决定自己的hitTest函数的返回值


:::

```dart {54}

  /// 重点看置灰的代码IgnorePointer源码
  RenderIgnorePointer({
    RenderBox? child,
    bool ignoring = true,
    @Deprecated(
      'Use ExcludeSemantics or create a custom ignore pointer widget instead. '
      'This feature was deprecated after v3.8.0-12.0.pre.'
    )
    bool? ignoringSemantics,
  }) : _ignoring = ignoring,
       _ignoringSemantics = ignoringSemantics,
       super(child);

  /// Whether this render object is ignored during hit testing.
  ///
  /// Regardless of whether this render object is ignored during hit testing, it
  /// will still consume space during layout and be visible during painting.
  ///
  /// {@macro flutter.widgets.IgnorePointer.semantics}
  bool get ignoring => _ignoring;
  bool _ignoring;
  set ignoring(bool value) {
    if (value == _ignoring) {
      return;
    }
    _ignoring = value;
    if (ignoringSemantics == null) {
      markNeedsSemanticsUpdate();
    }
  }

  /// Whether the semantics of this render object is ignored when compiling the semantics tree.
  ///
  /// {@macro flutter.widgets.IgnorePointer.ignoringSemantics}
  ///
  /// See [SemanticsNode] for additional information about the semantics tree.
  @Deprecated(
    'Use ExcludeSemantics or create a custom ignore pointer widget instead. '
    'This feature was deprecated after v3.8.0-12.0.pre.'
  )
  bool? get ignoringSemantics => _ignoringSemantics;
  bool? _ignoringSemantics;
  set ignoringSemantics(bool? value) {
    if (value == _ignoringSemantics) {
      return;
    }
    _ignoringSemantics = value;
    markNeedsSemanticsUpdate();
  }

  @override
  bool hitTest(BoxHitTestResult result, { required Offset position }) {
    return !ignoring && super.hitTest(result, position: position);
  }

  @override
  void visitChildrenForSemantics(RenderObjectVisitor visitor) {
    if (_ignoringSemantics ?? false) {
      return;
    }
    super.visitChildrenForSemantics(visitor);
  }

  @override
  void describeSemanticsConfiguration(SemanticsConfiguration config) {
    super.describeSemanticsConfiguration(config);
    // Do not block user interactions if _ignoringSemantics is false; otherwise,
    // delegate to _ignoring
    config.isBlockingUserActions = _ignoring && (_ignoringSemantics ?? true);
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties.add(DiagnosticsProperty<bool>('ignoring', _ignoring));
    properties.add(
      DiagnosticsProperty<bool>(
        'ignoringSemantics',
        _ignoringSemantics,
        description: _ignoringSemantics == null ? null : 'implicitly $_ignoringSemantics',
      ),
    );
  }
}

```


```dart {56,57,58}

  /// AbsorbPointer
  RenderAbsorbPointer({
    RenderBox? child,
    bool absorbing = true,
    @Deprecated(
      'Use ExcludeSemantics or create a custom absorb pointer widget instead. '
      'This feature was deprecated after v3.8.0-12.0.pre.'
    )
    bool? ignoringSemantics,
  }) : _absorbing = absorbing,
       _ignoringSemantics = ignoringSemantics,
       super(child);

  /// Whether this render object absorbs pointers during hit testing.
  ///
  /// Regardless of whether this render object absorbs pointers during hit
  /// testing, it will still consume space during layout and be visible during
  /// painting.
  ///
  /// {@macro flutter.widgets.AbsorbPointer.semantics}
  bool get absorbing => _absorbing;
  bool _absorbing;
  set absorbing(bool value) {
    if (_absorbing == value) {
      return;
    }
    _absorbing = value;
    if (ignoringSemantics == null) {
      markNeedsSemanticsUpdate();
    }
  }

  /// Whether the semantics of this render object is ignored when compiling the
  /// semantics tree.
  ///
  /// {@macro flutter.widgets.AbsorbPointer.ignoringSemantics}
  ///
  /// See [SemanticsNode] for additional information about the semantics tree.
  @Deprecated(
    'Use ExcludeSemantics or create a custom absorb pointer widget instead. '
    'This feature was deprecated after v3.8.0-12.0.pre.'
  )
  bool? get ignoringSemantics => _ignoringSemantics;
  bool? _ignoringSemantics;
  set ignoringSemantics(bool? value) {
    if (value == _ignoringSemantics) {
      return;
    }
    _ignoringSemantics = value;
    markNeedsSemanticsUpdate();
  }

  @override
  bool hitTest(BoxHitTestResult result, { required Offset position }) {
    return absorbing
        ? size.contains(position)
        : super.hitTest(result, position: position);
  }

  @override
  void visitChildrenForSemantics(RenderObjectVisitor visitor) {
    if (_ignoringSemantics ?? false) {
      return;
    }
    super.visitChildrenForSemantics(visitor);
  }

  @override
  void describeSemanticsConfiguration(SemanticsConfiguration config) {
    super.describeSemanticsConfiguration(config);
    // Do not block user interactions if _ignoringSemantics is false; otherwise,
    // delegate to absorbing
    config.isBlockingUserActions = absorbing && (_ignoringSemantics ?? true);
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties.add(DiagnosticsProperty<bool>('absorbing', absorbing));
    properties.add(
      DiagnosticsProperty<bool>(
        'ignoringSemantics',
        ignoringSemantics,
        description: ignoringSemantics == null ? null : 'implicitly $ignoringSemantics',
      ),
    );
  }
}



```