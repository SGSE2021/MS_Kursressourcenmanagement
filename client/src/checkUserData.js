function checkUserData() {
    const currentUserString = localStorage.getItem("current-user")
    const currentUserObject = JSON.parse(currentUserString)

    return currentUserObject
}

export default checkUserData