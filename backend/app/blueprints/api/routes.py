from flask import render_template, jsonify, request
from . import api
from ...models import User

'''Home route'''
@api.route("/", methods=['GET'])
def home():
    return render_template('home.html')

'''Get specific user'''
@api.get('/api/users')
def get_users():
    username = request.args.get('username')
    if username:
        users = User.query.filter_by(username=username).all()
        return jsonify([{'id': user.id, 'username': user.username} for user in users])
    else:
        return jsonify({'error': 'incorrect value entered'}), 400
    
'''Get specific user by user_id'''
@api.get('/api/users/<int:user_id>')
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({'id': user.id, 'username': user.username})

'''Create new user'''
@api.post('/api/create')
def create_user():
    # Get username and password
    username = request.json.get('username'),
    password = request.json.get('password')
    
    # Check to see if username/password are entered and if username already exists in DB
    if not username or not password:
        return jsonify({'error': 'username and password are required'}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'username already exists'}), 400
    
    # Store user info in dict
    new_user_data = {
        'username': username,
        'password': password
    }
    
    # Create instance of user
    new_user = User()

    # Implementing values from our form data for our instance
    new_user.from_dict(new_user_data)

    # Save user to database
    new_user.save_to_db()

    # Return JSON
    return jsonify({'status': 'success', 'id': new_user.id, 'username': new_user.username})

'''Update username'''
@api.put('/api/update/<int:user_id>')
def update_user(user_id):
    # create User() instance of current user, 
    user = User.query.get_or_404(user_id)
    username = request.json.get('username')

    if username:
        # store updated user info in dict
        new_user_data = {'username': username}
    
        # update with new username
        user.update_dict(new_user_data)

        # save to database
        user.save_to_db()
        return jsonify({'status': 'success', 'id': user.id, 'username': user.username})
    else:
        return jsonify({'status': 'error', 'message': 'Error with update.'})

'''Delete users'''
@api.delete('/api/delete/<int:user_id>')
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    user.delete_user()
    return jsonify({'message': 'user deleted'})