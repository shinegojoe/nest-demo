
## 操作說明:

- 在role區塊新增role名稱及模組名稱(後端會根據模組名稱進行權限檢查)
- 切換至auth-test分頁選取user登入
- 下面有兩隻api可進行測試:
  moduleA api使用者有 模組名稱為"moduleA"的role，並該role包含view的action才有訪問權限
  moduleB api使用者有 模組名稱為"moduleB"的role，並該role包含view的create才有訪問權限
- 若要在cms分頁刪除使用者，可給使用者增加userAdmin的role，在auth-test頁面登入後，就有權限進行刪除操作
- 為了避免不必要麻煩demo中把action新增刪除功能關閉

## live demo
- live demo - [live demo](http://45.63.121.57/)

