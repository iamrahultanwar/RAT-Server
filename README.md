# RAT-Server
Node Server which works without DB , its like offline offline firebase


            api calls
            ---------

            1....................................................................................................

            'api/create' => requires {

                file : name of the file you want to create.
            } : returns {

                callback : File is created or not.
            }

            2....................................................................................................

            'api/view' => requires {

                file : name of the file you want to view.
            } : returns {

                callback : Object contains information in the file.
            }

            3.....................................................................................................

            'api/delete' => requires {

                file : name of the file you want to delete.
            } : returns {

                callback : File is deleted or not.
            }

            4.....................................................................................................

            'api/insert' => requires {

                file : name of the file you want to insert data into. ['users']
                location : location you want to insert the data. ['users.usersInfo' | 'users.userInfo.5']
                data : data you want to insert.['{"email":"abc@gmail.com","password":"12345678"}']
            } : returns {

                callback : Data is inserted or not.
            }


            5.....................................................................................................

            'api/deletedata' => requires{

                file : name of the file you want to delete data from. ['users']
                location : location you want to delete the data. ['users.usersInfo' | 'users.userInfo.5']

            } : returns {

                callback : Data is Deleted or not.


            }

            6..................................................................................................

            'api/setdata' => requires{

                file : name of the file you want to set the  data from. ['users']
                location : location you want to set the data. ['users.usersInfo' | 'users.userInfo.5']
                data : data you want to set.['{"email":"abc@gmail.com","password":"12345678"}']

            } : returns {

                callback : Data is set or not.


            }

            7..................................................................................................

            'api/findindex' => requires{

                file : name of the file you want to set the  data from. ['users']
                location : location you want to set the data. ['users.usersInfo' | 'users.userInfo.5']
                compareto : name of the node you want to compare your data. ['email']
                comparedata : data that you want to compare. ['mr.rahultanwar@gmail.com']
            } : returns {

                callback : Returns the index of the path or return false if not found.


            }
