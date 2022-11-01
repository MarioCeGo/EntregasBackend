class User{
    constructor(name, pin, isAdmin, id){
        this.name = name;
        this.pin = pin;
        this.isAdmin = isAdmin;
        this.id = id;
    }
    getStatus(){
        return this.isAdmin;
    }
    setStatus(newStatus){
        this.isAdmin = newStatus;
    }
}

export default User