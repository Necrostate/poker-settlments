function getUserInput() {
    const participants = {};
    while (true) {
        const inputLine = prompt("Enter the participant's name and amount separated by a comma (or 'q' to quit): ");
        if (inputLine.toLowerCase() === 'q') {
            break;
        }
        const [name, amountStr] = inputLine.split(',');
        const amount = parseFloat(amountStr.trim());
        if (isNaN(amount) || !name) {
            alert("Invalid input. Please enter a valid name and amount separated by a comma.");
        } else {
            participants[name.trim()] = amount;
        }
    }
    return participants;
}

function settlePayments() {
    const participants = getUserInput();
    const sum = Object.values(participants).reduce((a, b) => a + b, 0);

    if (Math.round(sum * 1000) !== 0) {
        alert("Error: The sum of all amounts should be zero.");
        return;
    }

    let sortedParticipants = Object.entries(participants).sort((a, b) => a[1] - b[1]);

    while (sortedParticipants.length > 0 && sortedParticipants[0][1] < 0) {
        const [debtor, debt] = sortedParticipants.shift();
        const [creditor, credit] = sortedParticipants.pop();

        const amountToSend = parseFloat(Math.min(-debt, credit).toFixed(3));
        console.log(`${debtor} sends ${creditor} ${amountToSend} euros.`);

        if (parseFloat((debt + amountToSend).toFixed(3)) !== 0) {
            sortedParticipants.unshift([debtor, debt + amountToSend]);
        }
        if (parseFloat((credit - amountToSend).toFixed(3)) !== 0) {
            sortedParticipants.push([creditor, credit - amountToSend]);
        }
        sortedParticipants.sort((a, b) => a[1] - b[1]);
    }
}

settlePayments();