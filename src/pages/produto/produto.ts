import { Produto } from './../../Models/Produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the ProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  formProduto: FormGroup;

  produto: Produto;
  quantidade: number = 1;
  valor: number = 0;
  descricao: string;

  regexQuantidade = /^\d+$/;
  regexValor = /(^\d*\.?\d*[1-9]+\d*$)|(^[1-9]+\d*\.\d*$)/;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private afs: AngularFirestore) {

    this.formProduto = formBuilder.group({
      descricao: ['', Validators.required],
      valor: ['', Validators.compose([Validators.required, Validators.pattern(this.regexValor)])],
      quantidade: ['', Validators.compose([Validators.required, Validators.pattern(this.regexQuantidade)])]
    });

    if (this.navParams.data.produto) {
      this.produto = this.navParams.data.produto;

      this.quantidade = this.produto.quantidade;
      this.valor = this.produto.valor;
      this.descricao = this.produto.descricao;
    }


  }

  ionViewDidLoad() {

  }

  cancelar() {
    this.navCtrl.pop();
  }

  onSubmit() {
    if (this.produto) {

      this.produto.descricao = this.formProduto.value.descricao;
      this.produto.quantidade = this.formProduto.value.quantidade;
      this.produto.valor = this.formProduto.value.valor;

      this.afs.doc(`produtos/${this.produto.id}`).update({ descricao: this.produto.descricao, valor: this.produto.valor, quantidade: this.produto.quantidade })
        .then(() => this.navCtrl.pop())
        .catch(err => console.error(err));

    } else {

      let produto = {
        descricao: this.formProduto.value.descricao,
        quantidade: this.formProduto.value.quantidade,
        valor: this.formProduto.value.valor
      }

      this.afs.collection<Produto>('produtos').add(produto)
        .then(() => this.navCtrl.pop())
        .catch(err => console.error(err));
    }
  }
}
