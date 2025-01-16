from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# In-memory storage for loan applications
applications = {}

@app.route('/api/accept_application', methods=['POST'])
def accept_application():
    data = request.get_json()
    name = data.get('name')
    zipcode = data.get('zipcode')

    if not name or not zipcode:
        return jsonify({'error': 'Name and ZIP code are required'}), 400

    application_id = len(applications) + 1
    applications[application_id] = {
        'name': name,
        'zipcode': zipcode,
        'status': 'received'
    }

    return jsonify({'message': 'Application accepted', 'application_id': application_id})

@app.route('/api/check_status', methods=['GET'])
def check_status():
    application_id = request.args.get('application_id')

    if not application_id or not application_id.isdigit():
        return jsonify({'error': 'Valid application ID is required'}), 400

    application_id = int(application_id)
    application = applications.get(application_id)

    if not application:
        return jsonify({'status': 'not found'})

    return jsonify({
        'status': application['status'],
        'name': application['name'],
        'zipcode': application['zipcode']
    })

@app.route('/api/change_status', methods=['POST'])
def change_status():
    data = request.get_json()
    application_id = data.get('application_id')
    new_status = data.get('new_status')

    if not application_id or not str(application_id).isdigit() or not new_status:
        return jsonify({'error': 'Application ID and new status are required'}), 400

    application_id = int(application_id)
    application = applications.get(application_id)

    if not application:
        return jsonify({'error': 'Application not found'}), 404

    application['status'] = new_status
    return jsonify({'message': 'Status updated successfully'})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
