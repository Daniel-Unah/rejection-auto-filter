function autoFilter(){
    const folderName = "Rejections";
    let label = GmailApp.getUserLabelByName(folderName);
    if (!label) {
        label = GmailApp.createLabel(folderName);
    }
    const query = "is:inbox newer_than:7d";
    const threads = GmailApp.search(query, 0, 100);
    const rejectionPhrases = [
        "unfortunately", 
        "regret to inform",
        "not moving forward",
        "after careful consideration",
        "we’ve decided to proceed",
        "other candidates were more aligned",
        "position has been filled",
        "not selected for the next round"
    ];

    threads.forEach(thread => {
        const messages = thread.getMessages();
        let isRejection = false;

        messages.forEach(message => {
            const body = message.getBody().toLowerCase();
            const subject = message.getSubject().toLowerCase();
            rejectionPhrases.forEach(phrase => {
                if (body.includes(phrase)) {
                    isRejection = true;
                }
                if (subject.includes(phrase)) {
                    isRejection = true;
                }
            });
        });

        if (isRejection) {
            thread.moveToArchive();
            thread.addLabel(label);
            console.log(`Thread with subject "${thread.getFirstMessageSubject()}" moved to ${folderName} label.`);
        }
    });
}