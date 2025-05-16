# Rejection Email Auto-Filter (work in progress)

Tired of job rejection emails cluttering your inbox? This tool automatically filters them out so you can focus on the opportunities that matter. Works with **Gmail** and **Outlook**!

## Features
- **Gmail Version**: Moves rejections to a "Rejections" label hourly
- **Outlook Version**: Scans and archives rejections daily
- **Customizable** keyword list (because recruiters love creative rejection phrases)
- **Zero cost** - no premium services needed

---

# Gmail Setup

### Requirements
A Google account  

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

      const REJECTION_PHRASES = [
           "unfortunately",
           "regret to inform",
           "after careful consideration", // ← Add new ones here!
      ];

---

# Outlook Setup

### Requirements
- Windows 10/11 with Outlook 2016 or newer
- PowerShell 5.1+
- Administrator privileges (for initial configuration)

### Installation
1. **Prepare the directory**:
In powershell:

   `New-Item -Path "C:\Scripts\RejectionFilter" -ItemType Directory -Force`
   
3. **Install the script**:
   
   Download runScript.ps1 from outlook/runScript.ps1
   
   Save to `C:\Scripts\RejectionFilter\runScript.ps1`
   
5. **Configure execution policy**:
   
   `Start-Process powershell -Verb RunAs -ArgumentList "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"`

### Task Scheduler Configuration
**Create a new task**:
   
   `
      $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -File "C:\Scripts\RejectionFilter\runScript.ps1""
      $trigger = New-ScheduledTaskTrigger -AtLogOn
      $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd
      Register-ScheduledTask -Action $action -Trigger $trigger -Settings $settings -TaskName "Email Rejection Filter" -Description "Automatically filters rejection emails to Outlook folder" -RunLevel Highest
   `

### Customization
**Edit keywords in runScript.ps1**:

   `
   $keywords = @(
       "unfortunately",
       "regret to inform",
       "not moving forward",
       "after careful consideration",
       "we've decided to proceed",
       # Add your custom phrases here
       "position has been filled"
   )
   `

### Troubleshooting

1. **Verify task is running**:
   `Get-ScheduledTask -TaskName "Email Rejection Filter" | Get-ScheduledTaskInfo`
2. **Check script output**
   `Get-Content "$env:LOCALAPPDATA\Microsoft\Windows\PowerShell\RejectionFilter.log"`
      
