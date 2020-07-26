let url = "/"

if (process.env.NODE_ENV === 'development') {
    url = "http://localhost:5000/" 
}

export default { url }

