function main(selectedEmails: Outlook.SelectedItems) {
  const rejectionKeywords = [
    "unfortunately",
    "regret to inform",
    "not moving forward",
    "after careful consideration",
    "we’ve decided to proceed",
    "other candidates"
  ];

  const folderName = "Rejections";
  let rejectionsFolder = selectedEmails.getContext().mailbox.session.folders.getFirst(folderName);
  if (!rejectionsFolder) {
    rejectionsFolder = selectedEmails.getContext().mailbox.session.folders.add(folderName);
  }

  selectedEmails.get().forEach((email) => {
    const subject = email.subject.toLowerCase();
    const body = email.body.toLowerCase();
    const isRejection = rejectionKeywords.some(keyword => 
      subject.includes(keyword) || body.includes(keyword)
    );

    if (isRejection) {
      email.move(rejectionsFolder);
      console.log(`Moved: "${email.subject}"`);
    }
  });
}