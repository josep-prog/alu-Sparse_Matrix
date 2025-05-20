***SPARSE MATRIX***

Sparse matrix is a type of matrix which is designed just for helping the people to minimise the storage space .

Where in normal matrix vectors there are considered to be items in vectors with zero values. When zero is stored with valued data those zeros occupy space just like others , which means by eliminating them (zero valued items/data/number) will not only save space but also time as well. Which is where time complexity comes into play where we think of managing the time the program takes to run . 

On a sparse matrix we are thinking of the time taken for the value to be run . like whenever a company is looking for data it will be so easy for them to find data as only please data which their databases are valid. 

***Example***: "giving mathematical perspective before diving into the code functionality"

        \[ 0  0  0  6  0  0 \] 1    
        \[ 0  7  0  0  0  0 \] 2                                     
A \=   \[ 0  2  0  5  0  0 \] 3   
        \[ 0  0  0  0  0  0 \] 4  
        \[ 4  0  0  0  0  0 \] 5  
          1  2  3  4  5  6      
   

*  those numbers out of the box vector , represent index of column and row  
    
* "vertical" represent rows while "horizontal":represent column  
    
* however this index are done normally as for programming we start from zero

   
**sparse matrix table :**

| Row | Column | Value |
| :---- | :---- | :---- |
| 5 | 6 | 5 |
| 1 | 4 | 6 |
| 2 | 2 | 7 |
| 3 | 2 | 2 |
| 3 | 4 | 5 |

* **Total storage needed after sparse matrix operation** : 5\*2 \= 10 bytes

"5 represent only valid items which will be stored on the memory"

* **Total storage need before sparse matrix operation** : (6 rows \* 5 column) \* 2 \= 60 bytes

"30 or (5\*6) represent the total number of all items considered to be valid including zeros"

this means reduction in storage is 60 bytes \- 10 bytes \= 50 bytes

NOTE : this provided example was just for explain , how sparse matrix work , however example provided above is not part of the assignment it was just for giving highlight of who this will be working , this means for addition and subtraction will be done after creative sparse of vector of each vector to cross them . 

Coding and programming part  
\---------------------------

Directory structure : 

├── index.js  
├── matrix-storage.js  
├── operations.js  
├── sample\_inputs  
│   ├──  easy\_sample\_01\_2.txt  
│   ├── easy\_sample\_01\_2.txt  
│   ├── easy\_sample\_01\_3.txt  
│   ├── easy\_sample\_02\_1.txt  
│   ├── easy\_sample\_02\_2.txt  
│   ├── easy\_sample\_02\_3.txt  
│   ├── easy\_sample\_03\_1.txt  
│   ├── easy\_sample\_03\_2.txt  
│   ├── easy\_sample\_03\_3.txt  
│   ├── easy\_sample\_04\_1.txt  
│   ├── matrixfile1.txt  
│   └── matrixfile3.txt  
├── sample\_result  
│   └── result.txt \#if new operation is performed new file for storing operation result must be created by the user  
└── sparse-matrix.js

**Purpose of each file**

 \- **index.js file** : Handles user input (asks what operation you want)

 \- **matrix-storage.js file** : Reads matrix files to sparse matrix object and then saves the results back to files

 \- **operations.js :** Does the actual math: add/subtract/multiply matrices  
   
 \- **sparse-matrix** : manages storing of  sparse matrices efficiently

**To run**

node index.js

**Author**

Joseph Nishimwe  
