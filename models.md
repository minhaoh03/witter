# User
email
username
first_name
last_name
bio 
birth_date 
date_joined
last_login
profile_picture
privacy 
is_active
is_staff
is_superuser

# User (Admin)
- User

# Weet
id 
text 
digs 
image
timestamp
user
parent
privacy

# Comment
id
user FK
weet FK
comment
timestamp

# Digs
id
root_weet FK
text
image
timestamp
user FK
    
