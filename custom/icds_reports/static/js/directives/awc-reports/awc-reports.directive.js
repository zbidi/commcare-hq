/* global d3, _ */

var weight_for_age = {
    F: {
        'red': [
            {x: 0, y: 2},
            {x: 1, y: 2.7},
            {x: 2, y: 3.3},
            {x: 3, y: 3.9},
            {x: 4, y: 4.4},
            {x: 5, y: 4.8},
            {x: 6, y: 5.1},
            {x: 7, y: 5.3},
            {x: 8, y: 5.6},
            {x: 9, y: 5.8},
            {x: 10, y: 5.9},
            {x: 11, y: 6.1},
            {x: 12, y: 6.3},
            {x: 13, y: 6.4},
            {x: 14, y: 6.6},
            {x: 15, y: 6.7},
            {x: 16, y: 6.9},
            {x: 17, y: 7},
            {x: 18, y: 7.2},
            {x: 19, y: 7.3},
            {x: 20, y: 7.5},
            {x: 21, y: 7.6},
            {x: 22, y: 7.8},
            {x: 23, y: 7.9},
            {x: 24, y: 8.1},
            {x: 25, y: 8.2},
            {x: 26, y: 8.4},
            {x: 27, y: 8.5},
            {x: 28, y: 8.6},
            {x: 29, y: 8.8},
            {x: 30, y: 8.9},
            {x: 31, y: 9},
            {x: 32, y: 9.1},
            {x: 33, y: 9.3},
            {x: 34, y: 9.4},
            {x: 35, y: 9.5},
            {x: 36, y: 9.6},
            {x: 37, y: 9.7},
            {x: 38, y: 9.8},
            {x: 39, y: 9.9},
            {x: 40, y: 10.1},
            {x: 41, y: 10.2},
            {x: 42, y: 10.3},
            {x: 43, y: 10.4},
            {x: 44, y: 10.5},
            {x: 45, y: 10.6},
            {x: 46, y: 10.7},
            {x: 47, y: 10.8},
            {x: 48, y: 10.9},
            {x: 49, y: 11},
            {x: 50, y: 11.1},
            {x: 51, y: 11.2},
            {x: 52, y: 11.3},
            {x: 53, y: 11.4},
            {x: 54, y: 11.5},
            {x: 55, y: 11.6},
            {x: 56, y: 11.7},
            {x: 57, y: 11.8},
            {x: 58, y: 11.9},
            {x: 59, y: 12},
            {x: 60, y: 12.1},
            {x: 61, y: 12.352},
            {x: 62, y: 12.456},
            {x: 63, y: 12.559},
            {x: 64, y: 12.662},
            {x: 65, y: 12.764},
            {x: 66, y: 12.866},
            {x: 67, y: 12.968},
            {x: 68, y: 13.069},
            {x: 69, y: 13.169},
            {x: 70, y: 13.27},
            {x: 71, y: 13.371},
            {x: 72, y: 13.471},
        ],
        'orange': [
            {x: 0, y: 0.4},
            {x: 1, y: 0.4},
            {x: 2, y: 0.5},
            {x: 3, y: 0.5},
            {x: 4, y: 0.6},
            {x: 5, y: 0.6},
            {x: 6, y: 0.6},
            {x: 7, y: 0.7},
            {x: 8, y: 0.7},
            {x: 9, y: 0.7},
            {x: 10, y: 0.8},
            {x: 11, y: 0.8},
            {x: 12, y: 0.7},
            {x: 13, y: 0.8},
            {x: 14, y: 0.8},
            {x: 15, y: 0.9},
            {x: 16, y: 0.8},
            {x: 17, y: 0.9},
            {x: 18, y: 0.9},
            {x: 19, y: 0.9},
            {x: 20, y: 0.9},
            {x: 21, y: 1},
            {x: 22, y: 0.9},
            {x: 23, y: 1},
            {x: 24, y: 0.9},
            {x: 25, y: 1},
            {x: 26, y: 1},
            {x: 27, y: 1},
            {x: 28, y: 1.1},
            {x: 29, y: 1},
            {x: 30, y: 1.1},
            {x: 31, y: 1.1},
            {x: 32, y: 1.2},
            {x: 33, y: 1.1},
            {x: 34, y: 1.1},
            {x: 35, y: 1.2},
            {x: 36, y: 1.2},
            {x: 37, y: 1.2},
            {x: 38, y: 1.3},
            {x: 39, y: 1.3},
            {x: 40, y: 1.2},
            {x: 41, y: 1.3},
            {x: 42, y: 1.3},
            {x: 43, y: 1.3},
            {x: 44, y: 1.3},
            {x: 45, y: 1.4},
            {x: 46, y: 1.4},
            {x: 47, y: 1.4},
            {x: 48, y: 1.4},
            {x: 49, y: 1.4},
            {x: 50, y: 1.5},
            {x: 51, y: 1.5},
            {x: 52, y: 1.5},
            {x: 53, y: 1.5},
            {x: 54, y: 1.5},
            {x: 55, y: 1.6},
            {x: 56, y: 1.6},
            {x: 57, y: 1.6},
            {x: 58, y: 1.6},
            {x: 59, y: 1.6},
            {x: 60, y: 1.6},
            {x: 61, y: 1.609},
            {x: 62, y: 1.627},
            {x: 63, y: 1.645},
            {x: 64, y: 1.662},
            {x: 65, y: 1.68},
            {x: 66, y: 1.698},
            {x: 67, y: 1.715},
            {x: 68, y: 1.732},
            {x: 69, y: 1.75},
            {x: 70, y: 1.768},
            {x: 71, y: 1.785},
            {x: 72, y: 1.803},
        ],
        'green': [
            {x: 0, y: 1.8},
            {x: 1, y: 2.3},
            {x: 2, y: 2.7},
            {x: 3, y: 2.9},
            {x: 4, y: 3.2},
            {x: 5, y: 3.4},
            {x: 6, y: 3.6},
            {x: 7, y: 3.8},
            {x: 8, y: 3.9},
            {x: 9, y: 4},
            {x: 10, y: 4.2},
            {x: 11, y: 4.3},
            {x: 12, y: 4.5},
            {x: 13, y: 4.6},
            {x: 14, y: 4.7},
            {x: 15, y: 4.8},
            {x: 16, y: 4.9},
            {x: 17, y: 5},
            {x: 18, y: 5.1},
            {x: 19, y: 5.3},
            {x: 20, y: 5.3},
            {x: 21, y: 5.4},
            {x: 22, y: 5.6},
            {x: 23, y: 5.7},
            {x: 24, y: 5.8},
            {x: 25, y: 5.9},
            {x: 26, y: 6},
            {x: 27, y: 6.2},
            {x: 28, y: 6.3},
            {x: 29, y: 6.4},
            {x: 30, y: 6.5},
            {x: 31, y: 6.7},
            {x: 32, y: 6.8},
            {x: 33, y: 6.9},
            {x: 34, y: 7.1},
            {x: 35, y: 7.2},
            {x: 36, y: 7.3},
            {x: 37, y: 7.5},
            {x: 38, y: 7.6},
            {x: 39, y: 7.8},
            {x: 40, y: 7.9},
            {x: 41, y: 8},
            {x: 42, y: 8.2},
            {x: 43, y: 8.4},
            {x: 44, y: 8.6},
            {x: 45, y: 8.7},
            {x: 46, y: 8.8},
            {x: 47, y: 9},
            {x: 48, y: 9.2},
            {x: 49, y: 9.4},
            {x: 50, y: 9.5},
            {x: 51, y: 9.7},
            {x: 52, y: 9.8},
            {x: 53, y: 10},
            {x: 54, y: 10.2},
            {x: 55, y: 10.3},
            {x: 56, y: 10.5},
            {x: 57, y: 10.7},
            {x: 58, y: 10.9},
            {x: 59, y: 11},
            {x: 60, y: 11.2},
            {x: 61, y: 10.939},
            {x: 62, y: 11.007},
            {x: 63, y: 11.159},
            {x: 64, y: 11.313},
            {x: 65, y: 11.467},
            {x: 66, y: 11.621},
            {x: 67, y: 11.777},
            {x: 68, y: 11.934},
            {x: 69, y: 12.092},
            {x: 70, y: 12.25},
            {x: 71, y: 12.41},
            {x: 72, y: 12.571},
        ],
    },
    M: {
        'red': [
            {x: 0, y: 2.1},
            {x: 1, y: 2.9},
            {x: 2, y: 3.7},
            {x: 3, y: 4.3},
            {x: 4, y: 4.9},
            {x: 5, y: 5.3},
            {x: 6, y: 5.7},
            {x: 7, y: 5.9},
            {x: 8, y: 6.2},
            {x: 9, y: 6.4},
            {x: 10, y: 6.6},
            {x: 11, y: 6.8},
            {x: 12, y: 6.9},
            {x: 13, y: 7.1},
            {x: 14, y: 7.2},
            {x: 15, y: 7.4},
            {x: 16, y: 7.5},
            {x: 17, y: 7.7},
            {x: 18, y: 7.8},
            {x: 19, y: 8},
            {x: 20, y: 8.1},
            {x: 21, y: 8.2},
            {x: 22, y: 8.4},
            {x: 23, y: 8.5},
            {x: 24, y: 8.6},
            {x: 25, y: 8.8},
            {x: 26, y: 8.9},
            {x: 27, y: 9},
            {x: 28, y: 9.1},
            {x: 29, y: 9.2},
            {x: 30, y: 9.4},
            {x: 31, y: 9.5},
            {x: 32, y: 9.6},
            {x: 33, y: 9.7},
            {x: 34, y: 9.8},
            {x: 35, y: 9.9},
            {x: 36, y: 10},
            {x: 37, y: 10.1},
            {x: 38, y: 10.2},
            {x: 39, y: 10.3},
            {x: 40, y: 10.4},
            {x: 41, y: 10.5},
            {x: 42, y: 10.6},
            {x: 43, y: 10.7},
            {x: 44, y: 10.8},
            {x: 45, y: 10.9},
            {x: 46, y: 11},
            {x: 47, y: 11.1},
            {x: 48, y: 11.2},
            {x: 49, y: 11.3},
            {x: 50, y: 11.4},
            {x: 51, y: 11.5},
            {x: 52, y: 11.6},
            {x: 53, y: 11.7},
            {x: 54, y: 11.8},
            {x: 55, y: 11.9},
            {x: 56, y: 12},
            {x: 57, y: 12.1},
            {x: 58, y: 12.2},
            {x: 59, y: 12.3},
            {x: 60, y: 12.4},
            {x: 61, y: 12.718},
            {x: 62, y: 12.833},
            {x: 63, y: 12.95},
            {x: 64, y: 13.067},
            {x: 65, y: 13.186},
            {x: 66, y: 13.307},
            {x: 67, y: 13.429},
            {x: 68, y: 13.553},
            {x: 69, y: 13.679},
            {x: 70, y: 13.805},
            {x: 71, y: 13.934},
            {x: 72, y: 14.063},
        ],
        'orange': [
            {x: 0, y: 0.4},
            {x: 1, y: 0.4},
            {x: 2, y: 0.5},
            {x: 3, y: 0.6},
            {x: 4, y: 0.7},
            {x: 5, y: 0.7},
            {x: 6, y: 0.7},
            {x: 7, y:  0.8},
            {x: 8, y:  0.7},
            {x: 9, y:  0.7},
            {x: 10, y: 0.8},
            {x: 11, y: 0.8},
            {x: 12, y: 0.8},
            {x: 13, y: 0.8},
            {x: 14, y: 0.9},
            {x: 15, y: 0.9},
            {x: 16, y: 0.9},
            {x: 17, y: 0.9},
            {x: 18, y: 1},
            {x: 19, y: 0.9},
            {x: 20, y: 1},
            {x: 21, y: 1},
            {x: 22, y: 1},
            {x: 23, y: 1},
            {x: 24, y: 1.1},
            {x: 25, y: 1},
            {x: 26, y: 1.1},
            {x: 27, y: 1.1},
            {x: 28, y: 1.1},
            {x: 29, y: 1.2},
            {x: 30, y: 1.1},
            {x: 31, y: 1.2},
            {x: 32, y: 1.2},
            {x: 33, y: 1.2},
            {x: 34, y: 1.2},
            {x: 35, y: 1.3},
            {x: 36, y: 1.3},
            {x: 37, y: 1.3},
            {x: 38, y: 1.3},
            {x: 39, y: 1.3},
            {x: 40, y: 1.4},
            {x: 41, y: 1.4},
            {x: 42, y: 1.4},
            {x: 43, y: 1.4},
            {x: 44, y: 1.4},
            {x: 45, y: 1.5},
            {x: 46, y: 1.5},
            {x: 47, y: 1.5},
            {x: 48, y: 1.5},
            {x: 49, y: 1.5},
            {x: 50, y: 1.5},
            {x: 51, y: 1.6},
            {x: 52, y: 1.6},
            {x: 53, y: 1.6},
            {x: 54, y: 1.6},
            {x: 55, y: 1.6},
            {x: 56, y: 1.6},
            {x: 57, y: 1.6},
            {x: 58, y: 1.6},
            {x: 59, y: 1.7},
            {x: 60, y: 1.7},
            {x: 61, y: 1.649},
            {x: 62, y: 1.663},
            {x: 63, y: 1.677},
            {x: 64, y: 1.692},
            {x: 65, y: 1.706},
            {x: 66, y: 1.72},
            {x: 67, y: 1.735},
            {x: 68, y: 1.749},
            {x: 69, y: 1.763},
            {x: 70, y: 1.778},
            {x: 71, y: 1.792},
            {x: 72, y: 1.807},
        ],
        'green': [
            {x: 0, y:  1.9},
            {x: 1, y:  2.4},
            {x: 2, y:  2.7},
            {x: 3, y:  2.9},
            {x: 4, y:  3.1},
            {x: 5, y:  3.3},
            {x: 6, y:  3.4},
            {x: 7, y:  3.6},
            {x: 8, y:  3.8},
            {x: 9, y:  3.9},
            {x: 10, y: 4},
            {x: 11, y: 4.1},
            {x: 12, y: 4.3},
            {x: 13, y: 4.4},
            {x: 14, y: 4.5},
            {x: 15, y: 4.5},
            {x: 16, y: 4.7},
            {x: 17, y: 4.8},
            {x: 18, y: 4.9},
            {x: 19, y: 5},
            {x: 20, y: 5.1},
            {x: 21, y: 5.3},
            {x: 22, y: 5.3},
            {x: 23, y: 5.5},
            {x: 24, y: 5.6},
            {x: 25, y: 5.7},
            {x: 26, y: 5.8},
            {x: 27, y: 6},
            {x: 28, y: 6.1},
            {x: 29, y: 6.2},
            {x: 30, y: 6.4},
            {x: 31, y: 6.4},
            {x: 32, y: 6.6},
            {x: 33, y: 6.7},
            {x: 34, y: 6.8},
            {x: 35, y: 6.9},
            {x: 36, y: 7},
            {x: 37, y: 7.2},
            {x: 38, y: 7.3},
            {x: 39, y: 7.4},
            {x: 40, y: 7.5},
            {x: 41, y: 7.6},
            {x: 42, y: 7.7},
            {x: 43, y: 7.9},
            {x: 44, y: 8},
            {x: 45, y: 8.1},
            {x: 46, y: 8.2},
            {x: 47, y: 8.3},
            {x: 48, y: 8.5},
            {x: 49, y: 8.6},
            {x: 50, y: 8.8},
            {x: 51, y: 8.8},
            {x: 52, y: 9},
            {x: 53, y: 9.1},
            {x: 54, y: 9.3},
            {x: 55, y: 9.4},
            {x: 56, y: 9.6},
            {x: 57, y: 9.7},
            {x: 58, y: 9.9},
            {x: 59, y: 9.9},
            {x: 60, y: 10.1},
            {x: 61, y: 9.833},
            {x: 62, y: 9.927},
            {x: 63, y: 10.056},
            {x: 64, y: 10.187},
            {x: 65, y: 10.318},
            {x: 66, y: 10.45},
            {x: 67, y: 10.583},
            {x: 68, y: 10.716},
            {x: 69, y: 10.851},
            {x: 70, y: 10.986},
            {x: 71, y: 11.122},
            {x: 72, y: 11.259},
        ],
    },
};

var height_for_age = {
    M: {
        'red': [
            {x: 0, y:  44.200},
            {x: 1, y:  48.9},
            {x: 2, y:  52.4},
            {x: 3, y:  55.3},
            {x: 4, y:  57.6},
            {x: 5, y:  59.6},
            {x: 6, y:  61.2},
            {x: 7, y:  62.7},
            {x: 8, y:  64},
            {x: 9, y:  65.2},
            {x: 10, y: 66.4},
            {x: 11, y: 67.6},
            {x: 12, y: 68.6},
            {x: 13, y: 69.6},
            {x: 14, y: 70.6},
            {x: 15, y: 71.6},
            {x: 16, y: 72.5},
            {x: 17, y: 73.3},
            {x: 18, y: 74.2},
            {x: 19, y: 75},
            {x: 20, y: 75.8},
            {x: 21, y: 76.5},
            {x: 22, y: 77.2},
            {x: 23, y: 78},
            {x: 24, y: 78.7},
            {x: 25, y: 78.6},
            {x: 26, y: 79.3},
            {x: 27, y: 79.9},
            {x: 28, y: 80.5},
            {x: 29, y: 81.1},
            {x: 30, y: 81.7},
            {x: 31, y: 82.3},
            {x: 32, y: 82.8},
            {x: 33, y: 83.4},
            {x: 34, y: 83.9},
            {x: 35, y: 84.4},
            {x: 36, y: 85},
            {x: 37, y: 85.5},
            {x: 38, y: 86},
            {x: 39, y: 86.5},
            {x: 40, y: 87},
            {x: 41, y: 87.5},
            {x: 42, y: 88},
            {x: 43, y: 88.4},
            {x: 44, y: 88.9},
            {x: 45, y: 89.4},
            {x: 46, y: 89.8},
            {x: 47, y: 90.3},
            {x: 48, y: 90.7},
            {x: 49, y: 91.2},
            {x: 50, y: 91.6},
            {x: 51, y: 92.1},
            {x: 52, y: 92.5},
            {x: 53, y: 93},
            {x: 54, y: 93.4},
            {x: 55, y: 93.9},
            {x: 56, y: 94.3},
            {x: 57, y: 94.7},
            {x: 58, y: 95.2},
            {x: 59, y: 95.6},
            {x: 60, y: 96.1},
        ],
        'orange': [
            {x: 0, y: 1.9},
            {x: 1, y: 1.9},
            {x: 2, y: 2.0},
            {x: 3, y: 2.0},
            {x: 4, y: 2.1},
            {x: 5, y: 2.1},
            {x: 6, y: 2.1},
            {x: 7, y: 2.1},
            {x: 8, y: 2.2},
            {x: 9, y: 2.3},
            {x: 10, y: 2.3},
            {x: 11, y: 2.3},
            {x: 12, y: 2.4},
            {x: 13, y: 2.5},
            {x: 14, y: 2.5},
            {x: 15, y: 2.5},
            {x: 16, y: 2.5},
            {x: 17, y: 2.7},
            {x: 18, y: 2.7},
            {x: 19, y: 2.7},
            {x: 20, y: 2.8},
            {x: 21, y: 2.9},
            {x: 22, y: 3.0},
            {x: 23, y: 3.0},
            {x: 24, y: 3.0},
            {x: 25, y: 3.1},
            {x: 26, y: 3.2},
            {x: 27, y: 3.2},
            {x: 28, y: 3.3},
            {x: 29, y: 3.4},
            {x: 30, y: 3.4},
            {x: 31, y: 3.4},
            {x: 32, y: 3.6},
            {x: 33, y: 3.5},
            {x: 34, y: 3.6},
            {x: 35, y: 3.7},
            {x: 36, y: 3.7},
            {x: 37, y: 3.7},
            {x: 38, y: 3.8},
            {x: 39, y: 3.8},
            {x: 40, y: 3.9},
            {x: 41, y: 3.9},
            {x: 42, y: 3.9},
            {x: 43, y: 4.0},
            {x: 44, y: 4.1},
            {x: 45, y: 4.1},
            {x: 46, y: 4.2},
            {x: 47, y: 4.1},
            {x: 48, y: 4.2},
            {x: 49, y: 4.2},
            {x: 50, y: 4.3},
            {x: 51, y: 4.3},
            {x: 52, y: 4.4},
            {x: 53, y: 4.4},
            {x: 54, y: 4.4},
            {x: 55, y: 4.4},
            {x: 56, y: 4.5},
            {x: 57, y: 4.6},
            {x: 58, y: 4.5},
            {x: 59, y: 4.6},
            {x: 60, y: 4.6},
        ],
        'green': [
            {x: 0, y: 7.6},
            {x: 1, y: 7.8},
            {x: 2, y: 8},
            {x: 3, y: 8.2},
            {x: 4, y: 8.3},
            {x: 5, y: 8.4},
            {x: 6, y: 8.6},
            {x: 7, y: 8.7},
            {x: 8, y: 8.8},
            {x: 9, y: 9},
            {x: 10, y: 9.2},
            {x: 11, y: 9.3},
            {x: 12, y: 9.5},
            {x: 13, y: 9.7},
            {x: 14, y: 9.9},
            {x: 15, y: 10.1},
            {x: 16, y: 10.4},
            {x: 17, y: 10.5},
            {x: 18, y: 10.8},
            {x: 19, y: 11.1},
            {x: 20, y: 11.2},
            {x: 21, y: 11.5},
            {x: 22, y: 11.7},
            {x: 23, y: 11.9},
            {x: 24, y: 12.2},
            {x: 25, y: 12.5},
            {x: 26, y: 12.7},
            {x: 27, y: 13},
            {x: 28, y: 13.2},
            {x: 29, y: 13.4},
            {x: 30, y: 13.6},
            {x: 31, y: 13.9},
            {x: 32, y: 14},
            {x: 33, y: 14.3},
            {x: 34, y: 14.5},
            {x: 35, y: 14.6},
            {x: 36, y: 14.8},
            {x: 37, y: 15},
            {x: 38, y: 15.2},
            {x: 39, y: 15.4},
            {x: 40, y: 15.5},
            {x: 41, y: 15.7},
            {x: 42, y: 15.9},
            {x: 43, y: 16.1},
            {x: 44, y: 16.1},
            {x: 45, y: 16.3},
            {x: 46, y: 16.4},
            {x: 47, y: 16.7},
            {x: 48, y: 16.8},
            {x: 49, y: 17},
            {x: 50, y: 17.1},
            {x: 51, y: 17.2},
            {x: 52, y: 17.3},
            {x: 53, y: 17.5},
            {x: 54, y: 17.7},
            {x: 55, y: 17.8},
            {x: 56, y: 17.9},
            {x: 57, y: 18.1},
            {x: 58, y: 18.3},
            {x: 59, y: 18.4},
            {x: 60, y: 18.5},
        ],
    },
    F: {
        'red': [
            {x: 0, y: 43.6},
            {x: 1, y: 47.8},
            {x: 2, y: 51},
            {x: 3, y: 53.5},
            {x: 4, y: 55.6},
            {x: 5, y: 57.4},
            {x: 6, y: 58.9},
            {x: 7, y: 60.3},
            {x: 8, y: 61.7},
            {x: 9, y: 62.9},
            {x: 10, y: 64.1},
            {x: 11, y: 65.2},
            {x: 12, y: 66.3},
            {x: 13, y: 67.3},
            {x: 14, y: 68.3},
            {x: 15, y: 69.3},
            {x: 16, y: 70.2},
            {x: 17, y: 71.1},
            {x: 18, y: 72},
            {x: 19, y: 72.8},
            {x: 20, y: 73.7},
            {x: 21, y: 74.5},
            {x: 22, y: 75.2},
            {x: 23, y: 76},
            {x: 24, y: 76.7},
            {x: 25, y: 76.8},
            {x: 26, y: 77.5},
            {x: 27, y: 78.1},
            {x: 28, y: 78.8},
            {x: 29, y: 79.5},
            {x: 30, y: 80.1},
            {x: 31, y: 80.7},
            {x: 32, y: 81.3},
            {x: 33, y: 81.9},
            {x: 34, y: 82.5},
            {x: 35, y: 83.1},
            {x: 36, y: 83.6},
            {x: 37, y: 84.2},
            {x: 38, y: 84.7},
            {x: 39, y: 85.3},
            {x: 40, y: 85.8},
            {x: 41, y: 86.3},
            {x: 42, y: 86.8},
            {x: 43, y: 87.4},
            {x: 44, y: 87.9},
            {x: 45, y: 88.4},
            {x: 46, y: 88.9},
            {x: 47, y: 89.3},
            {x: 48, y: 89.8},
            {x: 49, y: 90.3},
            {x: 50, y: 90.7},
            {x: 51, y: 91.2},
            {x: 52, y: 91.7},
            {x: 53, y: 92.1},
            {x: 54, y: 92.6},
            {x: 55, y: 93},
            {x: 56, y: 93.4},
            {x: 57, y: 93.9},
            {x: 58, y: 94.3},
            {x: 59, y: 94.7},
            {x: 60, y: 95.2},
        ],
        'orange': [
            {x: 0, y:  1.8},
            {x: 1, y:  2.0},
            {x: 2, y:  2.0},
            {x: 3, y:  2.1},
            {x: 4, y:  2.2},
            {x: 5, y:  2.2},
            {x: 6, y:  2.3},
            {x: 7, y:  2.4},
            {x: 8, y:  2.3},
            {x: 9, y:  2.4},
            {x: 10, y: 2.4},
            {x: 11, y: 2.5},
            {x: 12, y: 2.6},
            {x: 13, y: 2.7},
            {x: 14, y: 2.7},
            {x: 15, y: 2.7},
            {x: 16, y: 2.8},
            {x: 17, y: 2.9},
            {x: 18, y: 2.9},
            {x: 19, y: 3.0},
            {x: 20, y: 3.0},
            {x: 21, y: 3.0},
            {x: 22, y: 3.2},
            {x: 23, y: 3.2},
            {x: 24, y: 3.3},
            {x: 25, y: 3.2},
            {x: 26, y: 3.3},
            {x: 27, y: 3.4},
            {x: 28, y: 3.4},
            {x: 29, y: 3.4},
            {x: 30, y: 3.5},
            {x: 31, y: 3.6},
            {x: 32, y: 3.6},
            {x: 33, y: 3.7},
            {x: 34, y: 3.7},
            {x: 35, y: 3.7},
            {x: 36, y: 3.8},
            {x: 37, y: 3.8},
            {x: 38, y: 3.9},
            {x: 39, y: 3.9},
            {x: 40, y: 4.0},
            {x: 41, y: 4.1},
            {x: 42, y: 4.1},
            {x: 43, y: 4.1},
            {x: 44, y: 4.1},
            {x: 45, y: 4.1},
            {x: 46, y: 4.2},
            {x: 47, y: 4.3},
            {x: 48, y: 4.3},
            {x: 49, y: 4.3},
            {x: 50, y: 4.4},
            {x: 51, y: 4.4},
            {x: 52, y: 4.4},
            {x: 53, y: 4.5},
            {x: 54, y: 4.5},
            {x: 55, y: 4.6},
            {x: 56, y: 4.7},
            {x: 57, y: 4.6},
            {x: 58, y: 4.7},
            {x: 59, y: 4.8},
            {x: 60, y: 4.7},
        ],
        'green': [
            {x: 0, y: 7.5},
            {x: 1, y: 7.8},
            {x: 2, y: 8.1},
            {x: 3, y: 8.4},
            {x: 4, y: 8.6},
            {x: 5, y: 8.9},
            {x: 6, y: 9.1},
            {x: 7, y: 9.2},
            {x: 8, y: 9.5},
            {x: 9, y: 9.7},
            {x: 10, y: 9.9},
            {x: 11, y: 10.1},
            {x: 12, y: 10.3},
            {x: 13, y: 10.5},
            {x: 14, y: 10.7},
            {x: 15, y: 11},
            {x: 16, y: 11.2},
            {x: 17, y: 11.4},
            {x: 18, y: 11.6},
            {x: 19, y: 11.8},
            {x: 20, y: 12},
            {x: 21, y: 12.3},
            {x: 22, y: 12.4},
            {x: 23, y: 12.7},
            {x: 24, y: 12.9},
            {x: 25, y: 13.1},
            {x: 26, y: 13.3},
            {x: 27, y: 13.5},
            {x: 28, y: 13.8},
            {x: 29, y: 14},
            {x: 30, y: 14.1},
            {x: 31, y: 14.3},
            {x: 32, y: 14.5},
            {x: 33, y: 14.7},
            {x: 34, y: 14.9},
            {x: 35, y: 15.1},
            {x: 36, y: 15.3},
            {x: 37, y: 15.4},
            {x: 38, y: 15.6},
            {x: 39, y: 15.8},
            {x: 40, y: 15.9},
            {x: 41, y: 16},
            {x: 42, y: 16.3},
            {x: 43, y: 16.4},
            {x: 44, y: 16.6},
            {x: 45, y: 16.8},
            {x: 46, y: 16.9},
            {x: 47, y: 17.1},
            {x: 48, y: 17.2},
            {x: 49, y: 17.4},
            {x: 50, y: 17.6},
            {x: 51, y: 17.7},
            {x: 52, y: 17.9},
            {x: 53, y: 18},
            {x: 54, y: 18.1},
            {x: 55, y: 18.3},
            {x: 56, y: 18.4},
            {x: 57, y: 18.6},
            {x: 58, y: 18.7},
            {x: 59, y: 18.8},
            {x: 60, y: 19},
        ],
    },
};

var url = hqImport('hqwebapp/js/urllib.js').reverse;

function AwcReportsController($scope, $http, $location, $routeParams, $log, DTOptionsBuilder, storageService, userLocationId) {
    var vm = this;
    vm.data = {};
    vm.label = "AWC Report";
    vm.tooltipPlacement = "right";
    vm.step = $routeParams.step;
    vm.data = null;
    vm.filters = ['gender', 'age'];
    vm.dtOptions = DTOptionsBuilder.newOptions().withOption('scrollX', '100%');
    vm.showTable = true;
    vm.showBeneficiary = false;
    vm.beneficiary = null;
    vm.markers = {};
    vm.center = {
        lat: 22.10,
        lng: 78.22,
        zoom: 5,
    };
    if (Object.keys($location.search()).length === 0) {
        $location.search(storageService.getKey('search'));
    } else {
        storageService.setKey('search', $location.search());
    }
    vm.filtersData = $location.search();
    vm.xTicks = [];
    vm.message = true;
    vm.selectedLocationLevel = storageService.getKey('search')['selectedLocationLevel'] || 0;

    vm.getDataForStep = function(step) {
        var get_url = url('awc_reports', step);
        if (parseInt(vm.selectedLocationLevel) === 4) {
            vm.myPromise = $http({
                method: "GET",
                url: get_url,
                params: $location.search(),
            }).then(
                function (response) {
                    vm.data = response.data;
                    vm.message = false;
                    if (vm.data.map) {
                        vm.markers = vm.data.map.markers;
                        if (Object.keys(vm.markers).length > 0) {
                            vm.center = {
                                lat: vm.markers[Object.keys(vm.markers)[0]].lat,
                                lng: vm.markers[Object.keys(vm.markers)[0]].lng,
                                zoom: 15,
                            };
                        }
                    }
                },
                function (error) {
                    $log.error(error);
                }
            );
        }
    };

    $scope.$on('filtersChange', function() {
        vm.getDataForStep(vm.step);
    });

    vm.getPopoverContent = function (data, type) {
        var html = '';
        if (type === 'weight' || type === 'both') {
            html += '<div>Weight: ' + (data.recorded_weight !== void(0) ? data.recorded_weight : "---") + '</div>';
        }
        if (type === 'height' || type === 'both') {
            html += '<div>Height: ' + (data.recorded_height !== void(0) ? data.recorded_height : "---") + '</div>';
        }
        return html;
    };

    setTimeout(function() {
        vm.chartOptions = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                width: 1100,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 80,
                },
                x: function (d) {
                    return d[0];
                },
                y: function (d) {
                    return d[1];
                },
                showValues: true,
                useInteractiveGuideline: true,
                clipVoronoi: false,
                duration: 500,
                xAxis: {
                    axisLabel: '',
                    tickFormat: function (d) {
                        if (typeof d === 'number') {
                            return d3.time.format('%m/%d/%y')(new Date(d));
                        } else if (typeof d === 'string') {
                            return d;
                        }
                    },
                },
                yAxis: {
                    axisLabel: '',
                },
            },
        };
        $scope.$apply();
    }, 1000);

    vm.beneficiaryChartOptions = {
        chart: {
            type: 'multiChart',
            height: 450,
            margin: {
                top: 20,
                right: 20,
                bottom: 50,
                left: 80,
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useVoronoi: false,
            clipEdge: true,
            duration: 100,
            useInteractiveGuideline: true,
            xAxis: {
                axisLabel: 'Months',
                showMaxMin: true,
            },
            yAxis: {
                axisLabel: '',
                tickFormat: function(d){
                    return d3.format("d")(d);
                },
            },
            yAxis1: {
                axisLabel: '',
                tickFormat: function(d){
                    return d3.format("d")(d);
                },
            },
        },
    };
    vm.beneficiaryChartOneData = [];
    vm.beneficiaryChartTwoData = [];
    vm.lineChartOneData = [];
    vm.lineChartTwoData = [];

    vm.showBeneficiaryDetails = function(case_id){
        var get_url = url('awc_reports', 'beneficiary_details');
        var params = $location.search();
        params['case_id'] = case_id;
        var highest_age = 0;

        vm.myPromise = $http({
            method: "GET",
            url: get_url,
            params: params,
        }).then(
            function (response) {
                vm.beneficiary = response.data;
                highest_age = vm.beneficiary.age * 12;
                vm.lineChartOneData = vm.beneficiary.weight;
                vm.lineChartTwoData = vm.beneficiary.height;

                vm.steps[vm.step].label = "Beneficiary Details";
                vm.showBeneficiary = true;
                vm.showTable = false;

                setTimeout(function() {
                    vm.beneficiaryChartOneData = [
                        {
                            key: 'red',
                            type: 'area',
                            values: weight_for_age[vm.beneficiary.sex]['red'].slice(0, highest_age + 1),
                            color: 'red',
                            yAxis: 1,
                        },
                        {
                            key: 'orange',
                            type: 'area',
                            values: weight_for_age[vm.beneficiary.sex]['orange'].slice(0, highest_age + 1),
                            color: 'orange',
                            yAxis: 1,
                        },
                        {
                            key: 'green',
                            type: 'area',
                            values: weight_for_age[vm.beneficiary.sex]['green'].slice(0, highest_age + 1),
                            color: 'green',
                            yAxis: 1,
                        },
                        {
                            key: 'line',
                            type: 'line',
                            values: vm.lineChartOneData,
                            color: 'black',
                            yAxis: 1,
                        },
                    ];
                    vm.beneficiaryChartTwoData = [
                        {
                            key: 'red',
                            type: 'area',
                            values: height_for_age[vm.beneficiary.sex]['red'].slice(0, highest_age + 1),
                            color: 'red',
                            yAxis: 1,
                        },
                        {
                            key: 'orange',
                            type: 'area',
                            values: height_for_age[vm.beneficiary.sex]['orange'].slice(0, highest_age + 1),
                            color: 'orange',
                            yAxis: 1,
                        },
                        {
                            key: 'green',
                            type: 'area',
                            values: height_for_age[vm.beneficiary.sex]['green'].slice(0, highest_age + 1),
                            color: 'green',
                            yAxis: 1,
                        },
                        {
                            key: 'line',
                            type: 'line',
                            values: vm.lineChartTwoData,
                            color: 'black',
                            yAxis: 1,
                        },
                    ];
                    $scope.$apply();
                }, 500);

            },
            function (error) {
                $log.error(error);
            }
        );
    };

    vm.showBeneficiaryTable = function(){
        vm.beneficiary = null;
        vm.steps[vm.step].label = "Beneficiary List";
        vm.showBeneficiary = false;
        vm.showTable = true;
    };

    vm.steps ={
        // system_usage: { route: "/awc_reports/system_usage", label: "System Usage"},
        pse: { route: "/awc_reports/pse", label: "Pre School Education"},
        maternal_child: { route: "/awc_reports/maternal_child", label: "Maternal and Child Nutrition"},
        demographics: { route: "/awc_reports/demographics", label: "Demographics"},
        beneficiary: { route: "/awc_reports/beneficiary", label: "Beneficiary List"},
    };

    vm.getDisableIndex = function () {
        var i = -1;
        window.angular.forEach(vm.selectedLocations, function (key, value) {
            if (key.location_id === userLocationId) {
                i = value;
            }
        });
        return i;
    };

    vm.moveToLocation = function(loc, index) {
        if (loc === 'national') {
            $location.search('location_id', '');
            $location.search('selectedLocationLevel', -1);
            $location.search('location_name', '');
        } else {
            $location.search('location_id', loc.location_id);
            $location.search('selectedLocationLevel', index);
            $location.search('location_name', loc.name);
        }
    };

    vm.layers = {
        baselayers: {
            mapbox_light: {
                name: 'Mapbox Light',
                url: 'https://api.mapbox.com/styles/v1/dimagi/cj2rl1t0w001f2rnr0y8hfhho/tiles/{z}/{x}/{y}?access_token={apikey}',
                type: 'xyz',
                layerOptions: {
                    apikey: 'pk.eyJ1IjoiZGltYWdpIiwiYSI6ImpZWWQ4dkUifQ.3FNy5rVvLolWLycXPxKVEA',
                },
            },
            osm: {
                name: 'OpenStreetMap',
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz',
            },
        },
    };

    vm.getDataForStep(vm.step);
}

AwcReportsController.$inject = ['$scope', '$http', '$location', '$routeParams', '$log', 'DTOptionsBuilder', 'storageService', 'userLocationId'];

window.angular.module('icdsApp').directive('awcReports', function() {
    return {
        restrict: 'E',
        templateUrl: url('icds-ng-template', 'awc-reports'),
        bindToController: true,
        controller: AwcReportsController,
        controllerAs: '$ctrl',
    };
});
