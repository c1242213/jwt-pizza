# Learning notes

## JWT Pizza code study and debugging
### to step through the frontend and see where its calling database: inspect -> network -> Fetch/XHR -> headers (reload the page)
As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component | Backend endpoints | Database SQL |
| --------------------------------------------------- | ------------------ | ----------------- | ------------ |
| View home page                                      |     home.tsx       |        none       |       none   |
| Register new user<br/>(t@jwt.com, pw: test)         |     login.tsx      | [PUT] /api/auth   |  INSERT INTO user (name, email, password) VALUES (?, ?, ?)  INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?)  |
| Login new user<br/>(t@jwt.com, pw: test)            |     login.tsx      | [PUT] /api/auth   |  SELECT * FROM userRole WHERE userId=? |
| Order pizza                                         |     menu.tsx       | [POST] /api/order |     INSERT INTO dinerOrder (dinerId, franchiseId, storeId, date) VALUES (?, ?, ?, now())  INSERT INTO orderItem (orderId, menuId, description, price) VALUES (?, ?, ?, ?) |
| Verify pizza                                        |   delivery.tsx | [POST] /api/order/verify  |  SELECT id, franchiseId, storeId, date FROM dinerOrder WHERE dinerId=? LIMIT ${offset},${config.db.listPerPage}        SELECT id, menuId, description, price FROM orderItem WHERE orderId=? |
| View profile page                                   | dinerDashboard.tsx | [GET] /api/order  |  SELECT id, franchiseId, storeId, date FROM dinerOrder WHERE dinerId=? LIMIT ${offset},${config.db.listPerPage}        SELECT id, menuId, description, price FROM orderItem WHERE orderId=? |
| View franchise<br/>(as diner)                       | franchiseDashboard.tsx | [GET] /api/franchise/:userId   |    INSERT INTO franchise (name) VALUES (?)  INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?)|
| Logout                                              |  logout.tsx        |  [DELETE] /api/auth    |   DELETE FROM auth WHERE token=?   |
| View About page                                     |      about.tsx     |    none        |        none |
| View History page                                   |     history.tsx    |     none       |     none     |
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) |  login.tsx   |    [PUT] /api/auth  |   SELECT * FROM userRole WHERE userId=? |
| View franchise<br/>(as franchisee)                  |    franchiseDashboard.tsx    |   [GET] /api/franchise/:userId   |    SELECT objectId FROM userRole WHERE role='franchisee' AND userId=?  SELECT id, name FROM franchise WHERE id in (${franchiseIds.join(',')}) |
| Create a store                                      |   createStore.tsx  |     [POST] /api/franchise/:franchiseId/store    |   INSERT INTO store (franchiseId, name) VALUES (?, ?)  |
| Close a store                                       |     closeStore.tsx     |  [DELETE] /api/franchise/:franchiseId/store/:storeId      |     DELETE FROM store WHERE franchiseId=? AND id=? |  
| Login as admin<br/>(a@jwt.com, pw: admin)           |  login.tsx   |    [PUT] /api/auth  |   SELECT * FROM userRole WHERE userId=? |
| View Admin page                                     |    adminDashboard.tsx   |  [GET] /api/franchise     |    SELECT id, name FROM franchise   SELECT id, name FROM store WHERE franchiseId=?  |
| Create a franchise for t@jwt.com                    |   franchiseDashboard.tsx   |   [GET] /api/franchise  |  SELECT objectId FROM userRole WHERE role='franchisee' AND userId=?  SELECT id, name FROM franchise WHERE id in (${franchiseIds.join(',')})  |
| Close the franchise for t@jwt.com                   |   franchiseDashboard.tsx    |  [DELETE] /api/franchise/:franchiseId   |   DELETE FROM store WHERE franchiseId=?       DELETE FROM userRole WHERE objectId=?     DELETE FROM franchise WHERE id=? |
