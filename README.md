# Traxero-Go-Lang-Assesment

Golang / react vin lookup app


Run backend:
`go run back-end/cmd/api/*.go `


Run frontend:
``` 
cd front-end/src/
npm start
```

Remove GROOT export when installing go

running go mod tidy solved the issue
This command goes through the go.mod file to resolve dependencies:


go get -u golang.org/x/sys


//Test VIN numbers

1GNES16S836152891
1FTNW21P43ED66093
1FM5K8D83DGB16915
1YVGE22CXV5548014


curl -v -X GET http://localhost:4000/v1/vehicles/4T1BF3EK7BU755043 -H "Authorization: Basic YWJjOjEyMw=="

https://golangbyexample.com/http-basic-auth-golang/