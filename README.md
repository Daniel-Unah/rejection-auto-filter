# Rejection Email Auto-Filter

Tired of job rejection emails cluttering your inbox? This tool automatically filters them out so you can focus on the opportunities that matter. Works with **Gmail** and **Outlook**!

## Features
- **Gmail Version**: Moves rejections to a "Rejections" label hourly
- **Outlook Version**: Scans and archives rejections daily
- **Customizable** keyword list (because recruiters love creative rejection phrases)
- **Zero cost** - no premium services needed

---

# Gmail Setup (5-minute install)

### What You'll Need
A Google account  
2 minutes of free time  

### Installation Steps
1. **Open** [script.google.com](https://script.google.com/) (make sure you're logged into your job-hunting account)
2. **Create** new project → Delete any sample code
3. **Copy-paste** the code from [gmail_script.js](gmail_script.js)
4. **First run**:
   - Click "Run"
   - Accept the permissions (it needs access to organize your emails)
5. **Set it and forget it**:
   - Click the clock icon (Triggers)
   - Add new trigger → Choose:
     - `autoFilterRejections`
     - Time-driven → Hour timer → Every hour

### Pro Tip 💡
Add your own rejection phrases by editing these lines:
```javascript
const REJECTION_PHRASES = [
  "unfortunately",
  "regret to inform",
  "after careful consideration", // ← Add new ones here!
];