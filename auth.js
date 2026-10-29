const {createHmac,timingSafeEqual,scryptSync}=require('node:crypto');
const COOKIE='en_admin';
function configured(){return !!(process.env.ADMIN_PASSWORD_HASH&&process.env.ADMIN_PASSWORD_SALT&&process.env.SESSION_SECRET&&process.env.SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY)}
function safeEqual(a,b){const x=Buffer.from(String(a));const y=Buffer.from(String(b));return x.length===y.length&&timingSafeEqual(x,y)}
function checkPassword(user,password){if(!configured()||typeof password!=='string'||password.length>512)return false;const validUser=safeEqual(user,process.env.ADMIN_USERNAME||'Ethicalninja');const hash=scryptSync(password,process.env.ADMIN_PASSWORD_SALT,64).toString('hex');return validUser&&safeEqual(hash,process.env.ADMIN_PASSWORD_HASH)}
function sign(data){return createHmac('sha256',process.env.SESSION_SECRET).update(data).digest('hex')}
function sessionCookie(){const exp=Date.now()+8*3600*1000;const payload=String(exp);return `${COOKIE}=${payload}.${sign(payload)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`}
function authenticated(req){if(!configured())return false;const match=(req.headers.cookie||'').match(/(?:^|;\s*)en_admin=([^;]+)/);if(!match)return false;const [payload,sig]=match[1].split('.');return !!(payload&&sig&&/^\d+$/.test(payload)&&Number(payload)>Date.now()&&safeEqual(sign(payload),sig))}
function clearCookie(){return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`}
function sameOrigin(req){const origin=req.headers.origin;if(!origin)return false;try{const u=new URL(origin);const host=req.headers['x-forwarded-host']||req.headers.host;return u.host===host&&u.protocol==='https:'}catch{return false}}
function noStore(res){res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff')}
module.exports={configured,checkPassword,sessionCookie,authenticated,clearCookie,sameOrigin,noStore};
