import {randomBytes,scryptSync} from 'node:crypto';
const password=process.argv[2];if(!password||password.length<12){console.error('Usage: node scripts/hash-password.mjs "NEW_LONG_PASSWORD"');process.exit(1)}
const salt=randomBytes(24).toString('hex');console.log('ADMIN_PASSWORD_SALT='+salt);console.log('ADMIN_PASSWORD_HASH='+scryptSync(password,salt,64).toString('hex'));console.log('SESSION_SECRET='+randomBytes(32).toString('hex'));
