let url = "/"

if (process.env.NODE_ENV === 'development') {
    url = "http://localhost:3001/" 
}

export default { url }

