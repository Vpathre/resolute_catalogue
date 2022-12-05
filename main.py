from flask import Flask, jsonify, request, json, render_template
from flask_cors import CORS
import numpy as np
import requests
from datetime import date
import time
import math

apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE5ODIyMDgwNiwidWlkIjozNjcyMjYzNCwiaWFkIjoiMjAyMi0xMS0yMlQxMToxNTozNy4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTQyMTM2NDgsInJnbiI6InVzZTEifQ.Iv4gkzBTpjp5af4lDd_pZwjMx3URxZ-4jpZETrqmNGE"
apiUrl = "https://api.monday.com/v2"
headers = {"Authorization": apiKey}

Lite_package = "The Lite package that you selected means that your school will get a basic implementation which includes student licenses, student guides and books, curriculum & teaching plans, and basic support."
Standard_package = "The Standard package that you selected means that your school will have full access to our platform and curriculum, as well as 5% discount on kits and 15% discount on teacher training."
Premium_package = "The Premium package that you selected means that your school will have full access to our platform and curriculum, as well as 10% discount on kits and 50% discount on teacher training. You will also receive a free STEAM day and tech-talk for your school!"


# creating a Flask app
app = Flask(__name__)
CORS(app)
print("> server running at http://localhost:5000")


def data_sort(data):
    """
    Categorize all the data received via the POST request
    """
    # Declare variables for use later
    streams = []
    books = []
    training = []
    try:
        streams_selected = {}
        books_selected = {}
        trainings_selected = {}
        pricing = {}
        name = data["name"]
        designation = data["designation"]
        school = data["school_name"]
        email = data["email"]
        phone = {
            'phone': data["phone"],
            'countryShortName': 'ZA'
        }
        location = data["location"]
        package = data["package"]
        date_field = {
            'date': date.today().strftime("%Y-%m-%d")
        }
        province_locations = {
            'Eastern Cape': {'lat': '-32.2968402', 'lng': '26.419389', 'address': 'Eastern Cape, South Africa'},
            'Free State': {'lat': '-28.4541105', 'lng': '26.7967849', 'address': 'Free State, South Africa'},
            'Gauteng': {'lat': '-26.2707593', 'lng': '28.1122679', 'address': 'Gauteng, South Africa'},
            'KwaZulu-Natal': {'lat': '-28.5305539","lng":"30.8958242', 'address': 'KwaZulu-Natal, South Africa'},
            'Limpopo': {'lat': '-23.4012946', 'lng': '29.4179324', 'address': 'Limpopo, South Africa'},
            'Mpumalanga': {'lat': '-25.565336', 'lng': '30.5279096', 'address': 'Mpumalanga, South Africa'},
            'Northen Cape': {'lat': '-29.0466808', 'lng': '21.8568586', 'address': 'Northern Cape, South Africa'},
            'North West': {'lat': '-26.6638599', 'lng': '25.2837585', 'address': 'North West, South Africa'},
            'Western Cape': {'lat': '-33.2277918', 'lng': '21.8568586', 'address': 'Western Cape, South Africa'}
        }
        proposal = math.ceil(int(data["cost"]))
        location = province_locations[location]
        total_order = list(np.concatenate(data["total_order"]).flat)
        print(proposal)
        print(total_order)


        for i in range(len(total_order)):
            if total_order[i] == "stream":
                streams.append(
                    [total_order[i-3], total_order[i-2], total_order[i-1]])
            if total_order[i] == "facilitator":
                books.append([total_order[i-3], total_order[i-2],
                              total_order[i-1], "Facilitator"])
            if total_order[i] == "student":
                books.append([total_order[i-3], total_order[i-2],
                              total_order[i-1], "Student"])
            if total_order[i] == "online training":
                training.append([total_order[i-4], total_order[i-3], total_order[i-2], total_order[i-1], "Online"])
            if total_order[i] == "person training":
                training.append([total_order[i-4], total_order[i-3], total_order[i-2], total_order[i-1], "Person"])

        temp_streams = dropdown_streams(streams)
        selected_streams_str = temp_streams[0]
        stream_quantity = temp_streams[1]
        temp_books = dropdown_books(books)
        facilitator_books_dropdown = temp_books[0]
        facilitator_books_qty = temp_books[1]
        student_books_dropdown = temp_books[2]
        student_books_qty = temp_books[3]
        temp_training = dropdown_training(training)
        training_dropdown = temp_training[0]
        training_qty = temp_training[1]
        training_type = str(temp_training[2])
        pdf = data["pdf"]
        print(training_type)

        # add streams to dict
        for i in range(len(streams)):
            streams_selected[streams[i][0]] = streams[i][1]

        # add books to dict
        for i in range(len(books)):
            books_selected[books[i][0]] = books[i][1]

        # add trainings to dict
        for i in range(len(training)):
            trainings_selected[training[i][0]] = training[i][1]

        # add pricing to a dict
        for i in range(len(data["total_order"])):
            pricing[data["total_order"][i][0]] = data["total_order"][i][2]

        query = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:3559887347, item_name:$myItemName, column_values:$columnVals) { id } }'
        vars = {
            'myItemName': name,
            'columnVals': json.dumps({
                "status": {"label": "Awaiting approval"},
                "date4": date_field,                                # date
                "text": name,                                       # client name
                "text8": school,                                    # school
                "text5": designation,                               # designation at school
                "location": location,                               # location of school
                "phone": phone,                                     # phone number
                "email": {'email': email, 'text': email},           # email
                "text05": package,                                  # package selected
                "dropdown": selected_streams_str,                   # streams selected by user
                "numbers7": proposal,                               # estimated potential sale
                "files": pdf,                                       # estimate pdf
                "text2": stream_quantity,                           # quantity of the streams selected
                "dropdown80": facilitator_books_dropdown,           # streams selected by user
                "text59": facilitator_books_qty,                    # quantity of the streams selected
                "dropdown21": student_books_dropdown,               # streams selected by user
                "text6": student_books_qty,                         # quantity of the streams selected
                "dropdown215": training_dropdown,
                "text9": training_qty,
                "status_1": {"label": training_type},
            })
        }
        print("sending data to monday")
        data = {'query': query, 'variables': vars}
        r = requests.post(url=apiUrl, json=data, headers=headers)
        return 200
    except:
        print("error sending to monday")
        return 500


def dropdown_streams(streams):
    '''
    Creates a text field corresponding to the streams selected and returns the quantity as text
    '''
    str_array = []  # array used to compute dropdown
    return_array = [] # array used to compute quantity
    for i in range(len(streams)):
        if streams[i][0] == "Novice Stream":
            str_array.append(1)
            return_array.append(f"Novice Stream: {streams[i][1]}")
        if streams[i][0] == "Apprentice Stream":
            str_array.append(2)
            return_array.append(f"Apprentice Stream: {streams[i][1]}")
        if streams[i][0] == "Adept Stream":
            str_array.append(3)
            return_array.append(f"Adept Stream: {streams[i][1]}")
        if streams[i][0] == "Beginner Stream":
            str_array.append(4)
            return_array.append(f"Beginner Stream: {streams[i][1]}")
        if streams[i][0] == "Advanced Stream":
            str_array.append(5)
            return_array.append(f"Advanced Stream: {streams[i][1]}")
        if streams[i][0] == "Master Stream":
            str_array.append(6)
            return_array.append(f"Master Stream: {streams[i][1]}")

    str_array.sort()
    temp = list(map(str, str_array))
    return_str = ','. join(temp)
    return_str_2 = '<br>'. join(return_array)
    return [return_str, return_str_2]

def dropdown_books(books):
    '''
    Creates a text field corresponding to the books selected and returns the quantity as text
    '''
    str_array_facilitator = []  # array used to compute dropdown
    return_array_facilitator = [] # array used to compute quantity
    str_array_student = []
    return_array_student = []
    for i in range(len(books)):
        if books[i][3] == "Facilitator":
            if books[i][0][21:books[i][0].index("L")-1] == "Novice":
                factor = 0
                str_array_facilitator.append(factor+int(books[i][0][len(books[i][0])-1:]))
                return_array_facilitator.append(f"Novice Lvl. {books[i][0][len(books[i][0])-1:]}: {books[i][1]}")
            if books[i][0][21:books[i][0].index("L")-1] == "Apprentice":
                factor = 3
                str_array_facilitator.append(factor+int(books[i][0][len(books[i][0])-1:]))
                return_array_facilitator.append(f"Apprentice Lvl. {books[i][0][len(books[i][0])-1:]}: {books[i][1]}")
            if books[i][0][21:books[i][0].index("L")-1] == "Advanced":
                factor = 6
                str_array_facilitator.append(factor+int(books[i][0][len(books[i][0])-1:]))
                return_array_facilitator.append(f"Advanced Lvl. {books[i][0][len(books[i][0])-1:]}: {books[i][1]}")

        elif books[i][3] == "Student":
            if books[i][0][17:books[i][0].index("L")-1] == "Novice":
                factor = 0
                str_array_student.append(factor+int(books[i][0][len(books[i][0])-1:]))
                return_array_student.append(f"Novice Lvl. {books[i][0][len(books[i][0])-1:]}: {books[i][1]}")
            if books[i][0][17:books[i][0].index("L")-1] == "Apprentice":
                factor = 3
                str_array_student.append(factor+int(books[i][0][len(books[i][0])-1:]))
                return_array_student.append(f"Apprentice Lvl. {books[i][0][len(books[i][0])-1:]}: {books[i][1]}")
            if books[i][0][17:books[i][0].index("L")-1] == "Advanced":
                factor = 6
                str_array_student.append(factor+int(books[i][0][len(books[i][0])-1:]))
                return_array_student.append(f"Advanced Lvl. {books[i][0][len(books[i][0])-1:]}: {books[i][1]}")

    str_array_student.sort()
    str_array_facilitator.sort()
    temp_1 = list(map(str, str_array_facilitator))
    temp_2 = list(map(str, str_array_student))
    return_str_1 = ','. join(temp_1) # facilitator book dropdowns
    return_str_2 = '<br>'. join(return_array_facilitator) # facilitator book quantity
    return_str_3 = ','. join(temp_2) # student book dropdowns
    return_str_4 = '<br>'. join(return_array_student) # student book quantity
    return [return_str_1, return_str_2, return_str_3, return_str_4]

def dropdown_training(training):
    '''
    Returns a string of integers corresponding to the dropdown in the teacher column
    '''
    flag = False # FALSE == ONLINE ////  TRUE == IN-PERSON
    return_status = ""
    training_dropdown = []
    training_qty = []
    for i in range(len(training)):
        if training[i][0] == "Novice Training":
            training_dropdown.append(1)
            training_qty.append(f"Novice: {training[i][1]}; {training[i][3]} sessions")
            if training[i][4] == "Person":
                flag = True
        if training[i][0] == "Apprentice Training":
            training_dropdown.append(2)
            training_qty.append(f"Apprentice: {training[i][1]}; {training[i][3]} sessions")
            if training[i][4] == "Person":
                flag = True
        if training[i][0] == "Adept Training":
            training_dropdown.append(3)
            training_qty.append(f"Adept: {training[i][1]}; {training[i][3]} sessions")
            if training[i][4] == "Person":
                flag = True
        if training[i][0] == "Beginner Training":
            training_dropdown.append(4)
            training_qty.append(f"Beginner: {training[i][1]}; {training[i][3]} sessions")
            if training[i][4] == "Person":
                flag = True
        if training[i][0] == "Advanced Training":
            training_dropdown.append(5)
            training_qty.append(f"Advanced: {training[i][1]}; {training[i][3]} sessions")
            if training[i][4] == "Person":
                flag = True
        if training[i][0] == "Master Training":
            training_dropdown.append(6)
            training_qty.append(f"Master: {training[i][1]}; {training[i][3]} sessions")
            if training[i][4] == "Person":
                flag = True

    if flag == True:
        return_status = "In-person"
    else:
        return_status = "Online"

    training_dropdown.sort()
    temp = list(map(str, training_dropdown))
    return_str = ','. join(temp)
    return_str_2 = '<br>'. join(training_qty)
    return [return_str, return_str_2, return_status]

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/estimate', methods=['GET', 'POST'])
def log_estimate():
    if(request.method == 'GET'):
        data = "Does not accept GET request"
        return jsonify({'data': data})
    if(request.method == 'POST'):
        content = request.json
        try:
            localtime = time.asctime( time.localtime(time.time()))
            print("Sales quote request came from "+request.remote_addr+" at "+localtime)
            status = data_sort(content)
            if status == 200:
                return jsonify({'data':'recieved'})
            else:
                return jsonify({'data':'monday error'})
        except (ValueError, KeyError, TypeError):
            return jsonify({'data':'JSON format error'})
    return


if __name__ == '__main__':
    app.run()

