#!/usr/bin/python3
from math import *

a = float(input("Valeur de a ?"))
b = float(input("Valeur de b ?"))
m = float(input("Valeur de m ?"))
p = float(input("Valeur de p ?"))
A = a * a * m * m + b/a
B = 2 * a * a * m * p
C = a * a * p * p - b * b
D = B * B - 4 * A * C
if D > 0:
    X = (-B - sqrt(D)) / (2 * A)
    Y = (-B + sqrt(D)) / (2 * A)
print("X=", X)
print("Y=", Y)
