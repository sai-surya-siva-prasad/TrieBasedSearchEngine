import { Component } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import * as fs from 'fs';
import * as path from 'path';
import { readFileSync } from 'fs';
import { HttpServiceService } from './http-service.service';
import { HttpClient } from  '@angular/common/http';

//import { fsync } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'my-app';

  showResult: boolean = false;

  result: boolean = false;

  outputText!: string;

  showInputInsert: boolean = false;

  inputInsertText!: string;

  wordsResult!: string;
  totalWords!: string;
  WordsList!: Array<string>;

  FinalResult!: Array<String>;

  //MasterTrieNode: any = new TrieNode();

  MasterTrie: any = new Trie();


  //private getwords : HttpServiceService;

  constructor(private getwords : HttpServiceService,
            private http: HttpClient){

  }


  ngOnInit() {

    this.showInputInsert = false;
    this.showResult = false;

    //this.MasterTrie = new Trie();

    this.http.get('assets/words.txt', {responseType: 'text'})
        .subscribe(data => this.printData(data));
  }

  printData(data: any){

    this.totalWords = data;

    let x = this.totalWords.split(" ");
    console.log(x[0]);
    console.log(x.length);
    console.log(typeof(x));
    this.WordsList = x;
    console.log(this.WordsList.length);
    console.log(this.WordsList[5]);
    var iterate = this.WordsList.length;

    for (let i = 0; i < iterate; i++) {
      this.insertMasterList(this.WordsList[i]);
    }
  }

  insertMasterList(word: string){

    console.log("inserted words ---"+ word);

    this.MasterTrie.addWord(word);

  }

  insertWords(word : string){

  if(word.trim() == ''){
    alert("please enter a word");
    return;
  }

  console.log("inside insert");

  this.MasterTrie.addWord(word);
  
  //trie.print();

  this.showInputInsert = true;

  this.inputInsertText = "Word Inserted";

  }

  searchWords(word : string){

    //console.log(word);

    if(word.trim() == ''){
      alert("please enter a word");
      return;
    }

    console.log(this.MasterTrie.find(word));

    //console.log("inside search");

    let fruits: Array<string>;
    fruits = ['Apple']; 
    fruits.pop();

    this.FinalResult = this.MasterTrie.find(word);

    console.log("Result after search---"+fruits);

    if(this.FinalResult.length == 1 && this.FinalResult[0] == word){
      this.result = true;
    }else{
      this.result = false;
    }

    this.showResult = true;

    if(this.result == true){
        this.outputText = "Word found";
    }else{
        this.outputText = "Word Not found";
    }

    //this.MasterTrie.print();

  }

}

class TrieNode {
  isCompleteWord: boolean;
  children: Map<string, TrieNode>;
  //root1: TrieNode;
  constructor() {
    this.isCompleteWord = false;
    this.children = new Map<string, TrieNode>();
  }
  has(letter: string): boolean {
    return this.children.has(letter);
  }
  
  setLetter(letter: string): TrieNode {
    const trieNode = new TrieNode();
    this.children.set(letter, trieNode);

    this.children.forEach((value: TrieNode, key: string) => {
      console.log(key, value);
    });


    return trieNode;
  }
  get(letter: string): TrieNode {
    return this.children.get(letter);
  }

  findWords(letters: string, results: string[]): string[] {

    this.children.forEach((trieNode, letter) => {
      const word = letters + letter;
      if (trieNode.isCompleteWord) {
        results.push(word);
      }
      trieNode.findWords(word, results);
    })
    return results;
  }

}
class Trie {

  root: TrieNode 
  
  constructor() {
    this.root = new TrieNode();
  }
  
  addWord(word: string): void {

    let trieNode: TrieNode  = this.root;
    
    for (const letter of word) {
      if (trieNode.has(letter)) {
        trieNode = trieNode.get(letter);
      } else {
        trieNode = trieNode.setLetter(letter);
      }
    }
    // last TrieNode determines the end of a word
    trieNode.isCompleteWord = true
  }

  find(letters: string): string[] {
    let trieNode: TrieNode = this.root;

    trieNode.children.forEach((value: TrieNode, key: string) => {
      console.log(key, value);
    });

    for (const letter of letters) {
      trieNode = trieNode.get(letter);
      if (!trieNode) {
        return []
      }
    }

    if(trieNode.isCompleteWord == true){

      let result: Array<string>;
      result = ['temp'];
      result.pop();
      result.push(letters);
      return result;
    }

    //console.log("trienode---children"+ trieNode.children.toString());
    return trieNode.findWords(letters, [])
  }

  // print() {
  //   if (!this.root) {
  //     return console.log('No root node found');
  //   }
  //   var newline = new TrieNode('|');
  //   var queue = [this.root, newline];
  //   var string = '';
  //   while (queue.length) {

  //     var node: any;
  //     node= queue.shift();
  //     string += node.content.toString() + ' ';
  //     if (node === newline && queue.length) {
  //       queue.push(newline);
  //     }
  //     for (var child in node.children) {
  //       if (node.children.hasOwnProperty(child)) {
  //         queue.push(node.children[child]);
  //       }
  //     }
  //   }
  //   console.log(string.slice(0, -2).trim());
  // }

}
