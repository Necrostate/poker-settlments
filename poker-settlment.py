def get_user_input():
    participants = {}
    while True:
        input_line = input("Enter the participant's name and amount separated by a comma (or 'q' to quit): ")
        if input_line.lower() == 'q':
            break
        try:
            name, amount_str = input_line.split(',')
            amount = float(amount_str.strip())
            participants[name.strip()] = amount
        except ValueError:
            print("Invalid input. Please enter a valid name and amount separated by a comma.")
    return participants

def settle_payments():
    participants = get_user_input()
    if round(sum(participants.values()),3) != 0:
        print("Error: The sum of all amounts should be zero.")
        return
    
    sorted_participants = sorted(participants.items(), key=lambda x: x[1])

    while sorted_participants and sorted_participants[0][1] < 0:
        debtor, debt = sorted_participants.pop(0)
        creditor, credit = sorted_participants.pop()

        amount_to_send = round(min(-debt, credit),3)
        print(f"{debtor} sends {creditor} {amount_to_send} euros.")

        if round(debt + amount_to_send,3) != 0:
            sorted_participants.insert(0, (debtor, debt + amount_to_send))
        if round(credit - amount_to_send,3) != 0:
            sorted_participants.append((creditor, credit - amount_to_send))
        sorted_participants.sort(key=lambda x: x[1])

settle_payments()