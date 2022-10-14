import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { docData, Firestore, setDoc, updateDoc} from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  constructor(private auth: Auth, private firestore: Firestore) { 
    
  }
  async register ({name,email,password})
  {
    try{
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      const uid=user.user.uid;
      const userDocRef = doc(this.firestore, `users/${uid}`);
      setDoc(userDocRef, { name, avatar:0, learn: 0, q1: "", q2: "", q3: "", q4:"", q5:""});
      return user;
    }
    catch(e)
    {
      return null;
    }
  }

  async login ({email,password})
  {
    try{
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      
      return user;
    }
    catch(e)
    {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  getUserById(id: string){
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, {idField: 'id'} );
  }
  updateQuiz(id: string, learn: number){
    const userDocRef = doc(this.firestore, `users/${id}`);
    return updateDoc(userDocRef, { learn: learn })
  }
  updateScore(id: string, q1: string, q2: string, q3: string, q4: string, q5: string, quiz: number){
    const userDocRef = doc(this.firestore, `users/${id}`);
    return updateDoc(userDocRef, { q1: q1, q2:q2, q3:q3, q4:q4, q5:q5, quiz: quiz })
  }
}
