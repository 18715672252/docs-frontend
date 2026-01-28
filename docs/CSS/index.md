# CSS样式设计

## 粘性布局-APP住宿选日期上下滑动日期粘性
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>

    * {
      margin: 0;
      padding: 0;
    }
    body {
      overflow: auto;
    }
    body > div > div {
      height: 50px;
      line-height: 50px;
    }
    p {
      font-size: 30px;
      font-weight: 700;
      background-color: red;
      
    }
    .p1 {
      position: sticky;
      top: 0px;
    }
    .p2 {
      position: sticky;
      top: 0px;
    }
    .p3 {
      position: sticky;
      top: 0px;
    }
    .p4 {
      position: sticky;
      top: 0px;
    }
  </style>
</head>
<body>
  <div>
    <p class="p1">第一组</p>
    <div>1组</div>
    <div>1组</div>
    <div>1组</div>
    <div>1组</div>
    <div>1组</div>
    <div>1组</div>
    <div>1组</div>
    <div>1组</div>
    <div>1组</div>
    <div>1组</div>
  </div>
  <div>
    <p class="p2">第二组</p>
  <div>2组</div>
  <div>2组</div>
  <div>2组</div>
  <div>2组</div>
  <div>2组</div>
  <div>2组</div>
  <div>2组</div>
  <div>2组</div>
  <div>2组</div>
  <div>2组</div>
  </div>
  <div>
    <p class="p3">第三组</p>
  <div>3组</div>
  <div>3组</div>
  <div>3组</div>
  <div>3组</div>
  <div>3组</div>
  <div>3组</div>
  <div>3组</div>
  <div>3组</div>
  <div>3组</div>
  <div>3组</div>
  </div>
  <div>
    <p class="p4">第四组</p>
  <div>4组</div>
  <div>4组</div>
  <div>4组</div>
  <div>4组</div>
  <div>4组</div>
  <div>4组</div>
  <div>4组</div>
  <div>4组</div>
  <div>4组</div>
  <div>4组</div>
  </div>
  
</body>
</html>


```

## SCSS换肤




## within