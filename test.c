#include <stdio.h>
#include <stdlib.h>
#include <math.h>
 
struct droite{
       double a;
       double b;    
};
 
typedef struct droite droite;
 
void afficher_droite(droite A);
droite demander_droite();
droite Symetrie(droite A, droite B);
 
droite Symetrie(droite A, droite B){
/*
  A est la droite d1
  B est l'axe de symétrie
  C est la droite symétrique à d1 par apport à d2
*/
       double x = (B.b-A.b)/(A.a-B.a);
       double y = (A.a*x) +A.b;
       droite C;
       /*avant il faut convertir les coefficiant en radians, puis le atan   en degrès.*/
 
       C.a=tan(2.00*atan(B.a) - atan(A.a));
       C.b = y - (C.a*x);
       return C;            
}
 
void afficher_droite(droite A){
     printf("y = %f x + %f\n",A.a,A.b);
}
 
droite demander_droite(){
     droite A;
     printf("Entrez le coefficient directeur:\n");
     scanf("%lf",&A.a);
     printf("Entrez l'ordonnee à l'origine:\n");
     scanf("%lf",&A.b);
     return A;    
}
 
int main(int argc, char *argv[])
{
  droite A = demander_droite();
  droite B = demander_droite(); 
  droite C = Symetrie(A,B);
  afficher_droite(A);
  afficher_droite(B);
  afficher_droite(C);
  system("PAUSE"); 
  return 0;
}
