async function request(username) {
    try {
        const response = await fetch('http://localhost:3000/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameInput: usernameInput })
        });

        const result = await response.text();
        // console.log(response);
        console.log(result);
        alert(result);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to check username availability');
    }
}
