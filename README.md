# password-recovery-api-NodeJS
for update version clone social-media-backend-branch
CLONE
```
https://github.com/AMRESH-SHARMA/password-recovery-api-NodeJS.git
```
RUN
```
npm i &&
node server

```

API
```
 POST http://localhost:8080/register                  [INPUT:  email, unique username, password in json body]
 POST http://localhost:8080/login                     [INPUT:  registered username, password in json body]
 POST http://localhost:8080/forgetPwd                 [INPUT:  email in json body]
 POST http://localhost:8080/updatePwd/:userId/:token  [INPUT:  userId, token in json body]

```
_____________________________
#Backend Packages
* dotenv
* express
* joi
* md5
* mongoose
* nodemailer
_____________________________
# Working
* User can register using email, unique username, password.
* joi package used for vadilation before saving data to db. 
* If username/email already exist then server will ask to choose unique one.
_____________________________
* Login using registered username and password
_____________________________
* To reset/forget password send email in json body, server will send you token with userId. 
* After receiving token and user id hit another request to update password. 
