Sparse matrix is type of matrix which is designed just for helping the people to minimise the storage space .

Where in normal matrix vectors there are considered to be items in vector with zero values. when zero are stored with valued datas those zeros occupies space just like others , which mean by eliminating them (zero valued items/data/number) will not only save the space but also time as well. which is where time complexity come in play where we think of managng the time program take to run . 

On sparse matrix we are thinking of the time , taken for the valued that to be run . like whenever company is looking for data it will be so easy for them to know find data as only please data which ae their database are valid. 

Example: "giving mathematical pespective before diving into the code functionality"
-------

    [ 0  0  0  6  0  0 ] 1                                   those numbers out of the box vector , represent index of column and row
                                                             however this index are done normally as for programming we start from zero    [ 0  7  0  0  0  0 ] 2                                   "vertical" represent rows while "horizontal":represent column

A = [ 0  2  0  5  0  0 ] 3

    [ 0  0  0  0  0  0 ] 4

    [ 4  0  0  0  0  0 ] 5
      1  2  3  4  5  6       
 
sparse matrix table :

| row | column | value |
-----------------------
| 5   |  6     | 5     | "this row of the table represent the total number of all value number in vector a and all columns and rows
-----------------------
| 1   |  4     | 6     | 
-----------------------
| 2   |  2     | 7     |
-----------------------
| 3   |  2     | 2     |
-----------------------
| 3   |  4     | 5     |
-----------------------+

Total storage needed after sparse matrix operation : 5*2 = 10 bytes
"5 represent only valid items which will be stored on the memory"

Total storage need before sparse matrix operation : (6 rows * 5 column) * 2 = 60 bytes
"30 or (5*6) represent the total number of all items considered to be valid including zeros"

this means reduction in storage is 60 bytes - 10 bytes = 50 bytes

NOTE : this provided example was just for explain , how sparse matrix work , however example provided above is not part of the assignment it was just for giving highlight of who this will be working , this means for addition and subtraction will be done after creative sparse of vector of each vector to cross them . 

Coding and programming part
---------------------------

Directory structure : 

├── index.js
├── matrix-storage.js
├── operations.js
├── sample_inputs
│   ├──  easy_sample_01_2.txt
│   ├── easy_sample_01_2.txt
│   ├── easy_sample_01_3.txt
│   ├── easy_sample_02_1.txt
│   ├── easy_sample_02_2.txt
│   ├── easy_sample_02_3.txt
│   ├── easy_sample_03_1.txt
│   ├── easy_sample_03_2.txt
│   ├── easy_sample_03_3.txt
│   ├── easy_sample_04_1.txt
│   ├── matrixfile1.txt
│   └── matrixfile3.txt
├── sample_result
│   └── result.txt #if new operation is performed new file for storing operation result must be created by the user
└── sparse-matrix.js

Purpose of each file
--------------------

 - index.js file : Handles user input (asks what operation you want)

 - matrix-storage.js file : Reads matrix files to sparsematrix object and then saves the results back to files

 - operations.js : Does the actual math: add/subtract/multiply matrices
 
 - sparse-matrix : manages storing of  sparse matrices efficiently

To run
------
node index.js

Author
------
Joseph Nishimwe
