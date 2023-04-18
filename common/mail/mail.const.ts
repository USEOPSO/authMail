export const MailSubject = {
  Register: '회원가입 확인 메일입니다.',
  ResetPassword: '비밀번호 초기화 확인 메일입니다.',
  ChangeEmail: '이메일 변경 확인 메일입니다.',
}

export const MailType = {
  Register: 0,
  ResetPassword: 1,
  ChangeEmail: 2,
}

export const MailExpire = {
  Second: 12 * 60 * 60 * 1000,
}

export const MailFormat = {
  Register: (serverUrl: string, token: string, mailType: number, name: string) => ({
    msg:
      `<html>` +
      `<head>` +
      `<style>` +
      `@import url(http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌lic,400italic,500,500italic,700,700italic,900italic,900);` +
      `html, body, html * {` +
      `font-family: 'Roboto', sans-serif;` +
      `}` +
      `.container {` +
      `width: 100%;` +
      `display: flex;` +
      `flex-direction: column;` +
      `align-items: center;` +
      `}` +
      `.content {` +
      `width: 680px;` +
      `padding: 48px;` +
      `border: 1px solid #DDDDDD;` +
      `border-radius: 8px;` +
      `}` +
      `.compnay_info {` +
      `font-size: 12px;` +
      `color: #999999;` +
      `text-align: center;` +
      `margin-top: 16px;` +
      `}` +
      `.logo img{` +
      `width: 112px;` +
      `height: 50px;` +
      `}` +
      `.title {` +
      `font-weight: 600;` +
      `margin-top: 40px;` +
      `font-size: 18px;` +
      `color: #7B30FD;` +
      `}` +
      `.name {` +
      `font-weight: 600;` +
      `margin-top: 40px;` +
      `font-size: 14px;` +
      `}` +
      `.description {` +
      `margin-top: 24px;` +
      `font-size: 14px;` +
      `line-height: 140%;` +
      `}` +
      `.button {` +
      `margin-top: 24px;` +
      `width: 180px;` +
      `height: 48px;` +
      `display: flex;` +
      `justify-content: center;` +
      `align-items: center;` +
      `background: #7B30FD;` +
      `border-radius: 8px;` +
      `font-size: 12px;` +
      `color: #FFFFFF;` +
      `cursor: pointer;` +
      `transition: 0.3s;` +
      `}` +
      `.button:hover {` +
      `background-color: #4E16E8;` +
      `}` +
      `</style>` +
      `<script>` +
      `function handleClickButton() {` +
      `window.open(${serverUrl}+'/verify?mailType=0&token='+${token}+'name='+${name});` +
      `}` +
      `</script>` +
      `</head>` +
      `<body>` +
      `<div class="container" style="width: 100%;display: flex;flex-direction:column;align-items: center;">` +
      `<div class="content" style="width: 680px;padding: 48px;border: 1px solid #DDDDDD;border-radius: 8px;">` +
      `<div class="logo">` +
      `<image src="" style="width: 112px;height: 50px;" />` +
      `</div>` +
      `<div class="title" style="font-weight: 600;margin-top: 40px;font-size: 18px;color: #7B30FD;">` +
      `Verify Your Email Address` +
      `</div>` +
      `<div class="name" style="font-weight: 600;margin-top: 40px;font-size: 14px;">` +
      `Hi ${name},` +
      `</div>` +
      `<a  href=${serverUrl}/verify?mailType=0&token=${token}&name=${name}><div style="margin-top: 24px;width: 180px;height: 48px;text-align:center;background: #7B30FD;border-radius: 8px;font-size: 12px;color: #FFFFFF;">` +
      `<span style="display:inline-block;padding-top:14px;">Complete Verification</span>` +
      `</div></a>` +
      `<div class="description" style="margin-top: 24px;font-size: 14px;line-height: 140%;">` +
      `If you cannot click on the link, copy and paste the following URL into a new tab in your browser: <br />` +
      `<a href=${serverUrl}/verify?mailType=0&token=${token}&name=${name}>${serverUrl}/verify?mailType=0&token=${token}&name=${name}</a>` +
      `</div>` +
      `<div class="description" style="margin-top: 24px;font-size: 14px;line-height: 140%;">` +
      `Thank you.` +
      `</div>` +
      `</div>` +
      `</div>` +
      `</body>` +
      `</html>`,
  }),
  ResetPassword: (serverUrl: string, token: string, mailType: number, name: string) => ({
    msg:
      `<html>` +
      `<head>` +
      `<style>` +
      `@import url(http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌lic,400italic,500,500italic,700,700italic,900italic,900);` +
      `html, body, html * {` +
      `font-family: 'Roboto', sans-serif;` +
      `}` +
      `.container {` +
      `width: 100%;` +
      `display: flex;` +
      `flex-direction: column;` +
      `align-items: center;` +
      `}` +
      `.content {` +
      `width: 680px;` +
      `padding: 48px;` +
      `border: 1px solid #DDDDDD;` +
      `border-radius: 8px;` +
      `}` +
      `.compnay_info {` +
      `font-size: 12px;` +
      `color: #999999;` +
      `text-align: center;` +
      `margin-top: 16px;` +
      `}` +
      `.logo img{` +
      `width: 112px;` +
      `height: 50px;` +
      `}` +
      `.title {` +
      `font-weight: 600;` +
      `margin-top: 40px;` +
      `font-size: 18px;` +
      `color: #7B30FD;` +
      `}` +
      `.name {` +
      `font-weight: 600;` +
      `margin-top: 40px;` +
      `font-size: 14px;` +
      `}` +
      `.description {` +
      `margin-top: 24px;` +
      `font-size: 14px;` +
      `line-height: 140%;` +
      `}` +
      `.button {` +
      `margin-top: 24px;` +
      `width: 180px;` +
      `height: 48px;` +
      `display: flex;` +
      `justify-content: center;` +
      `align-items: center;` +
      `background: #7B30FD;` +
      `border-radius: 8px;` +
      `font-size: 12px;` +
      `color: #FFFFFF;` +
      `cursor: pointer;` +
      `transition: 0.3s;` +
      `}` +
      `.button:hover {` +
      `background-color: #4E16E8;` +
      `}` +
      `</style>` +
      `<script>` +
      `function handleClickButton() {` +
      `window.open(${serverUrl}+'/password?mailType=1&token='+${token}+'name='+${name});` +
      `}` +
      `</script>` +
      `</head>` +
      `<body>` +
      `<div class="container" style="width: 100%;display: flex;flex-direction:column;align-items: center;">` +
      `<div class="content" style="width: 680px;padding: 48px;border: 1px solid #DDDDDD;border-radius: 8px;">` +
      `<div class="logo">` +
      `<image src="" style="width: 112px;height: 50px;" />` +
      `</div>` +
      `<div class="title" style="font-weight: 600;margin-top: 40px;font-size: 18px;color: #7B30FD;">` +
      `Reset password` +
      `</div>` +
      `<div class="name" style="font-weight: 600;margin-top: 40px;font-size: 14px;">` +
      `Hi ${name},` +
      `</div>` +
      `<a><div style="margin-top: 24px;width: 180px;height: 48px;text-align:center;background: #7B30FD;border-radius: 8px;font-size: 12px;color: #FFFFFF;">` +
      `<span style="display:inline-block;padding-top:14px;">RESET YOUR PASSWORD</span>` +
      `</div></a>` +
      `<div class="description" style="margin-top: 24px;font-size: 14px;line-height: 140%;">` +
      `If you don’t use this link within 12 hours, it will be expired. To get a new password reset link from <br /> login page. Thank you.` +
      `</div>` +
      `</div>` +
      `</div>` +
      `</body>` +
      `</html>`,
  }),
  ChangeEmail: (serverUrl: string, token: string, mailType: number, name: string) => ({
    msg:
      `<html>` +
      `<head>` +
      `<style>` +
      `@import url(http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌lic,400italic,500,500italic,700,700italic,900italic,900);` +
      `html, body, html * {` +
      `font-family: 'Roboto', sans-serif;` +
      `}` +
      `.container {` +
      `width: 100%;` +
      `display: flex;` +
      `flex-direction: column;` +
      `align-items: center;` +
      `}` +
      `.content {` +
      `width: 680px;` +
      `padding: 48px;` +
      `border: 1px solid #DDDDDD;` +
      `border-radius: 8px;` +
      `}` +
      `.compnay_info {` +
      `font-size: 12px;` +
      `color: #999999;` +
      `text-align: center;` +
      `margin-top: 16px;` +
      `}` +
      `.logo img{` +
      `width: 112px;` +
      `height: 50px;` +
      `}` +
      `.title {` +
      `font-weight: 600;` +
      `margin-top: 40px;` +
      `font-size: 18px;` +
      `color: #7B30FD;` +
      `}` +
      `.name {` +
      `font-weight: 600;` +
      `margin-top: 40px;` +
      `font-size: 14px;` +
      `}` +
      `.description {` +
      `margin-top: 24px;` +
      `font-size: 14px;` +
      `line-height: 140%;` +
      `}` +
      `.button {` +
      `margin-top: 24px;` +
      `width: 180px;` +
      `height: 48px;` +
      `display: flex;` +
      `justify-content: center;` +
      `align-items: center;` +
      `background: #7B30FD;` +
      `border-radius: 8px;` +
      `font-size: 12px;` +
      `color: #FFFFFF;` +
      `cursor: pointer;` +
      `transition: 0.3s;` +
      `}` +
      `.button:hover {` +
      `background-color: #4E16E8;` +
      `}` +
      `</style>` +
      `<script>` +
      `function handleClickButton() {` +
      `window.open(${serverUrl}+'/verify?mailType=0&token='+${token}+'name='+${name});` +
      `}` +
      `</script>` +
      `</head>` +
      `<body>` +
      `<div class="container" style="width: 100%;display: flex;flex-direction:column;align-items: center;">` +
      `<div class="content" style="width: 680px;padding: 48px;border: 1px solid #DDDDDD;border-radius: 8px;">` +
      `<div class="logo">` +
      `<image src="" style="width: 112px;height: 50px;" />` +
      `</div>` +
      `<div class="title" style="font-weight: 600;margin-top: 40px;font-size: 18px;color: #7B30FD;">` +
      `Verify Your Email Address` +
      `</div>` +
      `<div class="name" style="font-weight: 600;margin-top: 40px;font-size: 14px;">` +
      `Hi ${name},` +
      `</div>` +
      `<a  href=${serverUrl}/verify?mailType=0&token=${token}&name=${name}><div style="margin-top: 24px;width: 180px;height: 48px;text-align:center;background: #7B30FD;border-radius: 8px;font-size: 12px;color: #FFFFFF;">` +
      `<span style="display:inline-block;padding-top:14px;">Complete Verification</span>` +
      `</div></a>` +
      `<div class="description" style="margin-top: 24px;font-size: 14px;line-height: 140%;">` +
      `If you cannot click on the link, copy and paste the following URL into a new tab in your browser: <br />` +
      `<a href=${serverUrl}/verify?mailType=0&token=${token}&name=${name}>${serverUrl}/verify?mailType=0&token=${token}&name=${name}</a>` +
      `</div>` +
      `<div class="description" style="margin-top: 24px;font-size: 14px;line-height: 140%;">` +
      `Thank you.` +
      `</div>` +
      `</div>` +
      `</div>` +
      `</body>` +
      `</html>`,
  }),
}
