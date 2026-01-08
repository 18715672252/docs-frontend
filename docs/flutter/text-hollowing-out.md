# 文字镂空
```dart
class TextHollowingOut extends StatelessWidget {
  const TextHollowingOut({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Stack(
        children: [
          Text('文字镂空效果', style: TextStyle(
            fontSize: 40,
            fontWeight: FontWeight.bold,
            foreground: Paint()..color = Colors.red..strokeWidth = 2..style = PaintingStyle.stroke
          ),),
          Text('文字镂空效果', style: TextStyle(
            fontSize: 40,
            fontWeight: FontWeight.bold,
            color: Colors.white
            // foreground: Paint()..color = Colors.red..strokeWidth = 2..style = PaintingStyle.stroke
          ),),
        ],
      ),
    );
  }
}
```