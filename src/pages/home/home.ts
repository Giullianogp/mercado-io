import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Produto } from '../../Models/Produto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  produtosCollection: AngularFirestoreCollection<Produto>;
  produtos: Produto[];
  user: any;
  valorTotal: number = 0;
  saldo: number = 0;

  constructor(public navCtrl: NavController, private afs: AngularFirestore, private auth: AuthService) {
    this.user = auth.getUser();
  }

  ionViewDidEnter() {
    if (this.user) {
      this.produtosCollection = this.afs.collection<Produto>('produtos', ref => ref.where("userId", "==", this.user.uid));
      this.produtosCollection.snapshotChanges().subscribe(listaProduto => {
        this.valorTotal = 0;
        this.produtos = listaProduto.map(item => {
          this.valorTotal += item.payload.doc.data().valor * item.payload.doc.data().quantidade;
          return {
            descricao: item.payload.doc.data().descricao,
            valor: item.payload.doc.data().valor,
            quantidade: item.payload.doc.data().quantidade,
            userId: item.payload.doc.data().userId,
            id: item.payload.doc.id,
          }
        })
      })
    }
  }

  itemSelected(produto: Produto) {
    this.navCtrl.push("ProdutoPage", { produto: produto });
  }

  remove(produto: Produto) {
    this.afs.doc(`produtos/${produto.id}`).delete()
      .then(() => console.log("Produto eliminado"))
      .catch(err => console.error(err));
  }

  add() {
    this.navCtrl.push("ProdutoPage");
  }

  limparLista() {
    this.produtos.forEach(prod => {
      this.afs.doc(`produtos/${prod.id}`).delete()
        .then(() => console.log("Produto eliminado"))
        .catch(err => console.error(err));
    })
  }

  logOut() {
    this.auth.signOut()
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => console.log(error.message)
      );
  }

}


