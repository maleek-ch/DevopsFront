import { Component, OnInit } from '@angular/core';
import { NomDuServiceService } from './nom-du-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { foyer } from './Foyer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tpfoyerFront';

  form: boolean = false;
  closeResult!: string;
  listfoyers: any;
  foyer!:any;

  constructor(private contraService: NomDuServiceService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.getAllfoyer();
    console.log(this.listfoyers)
    this.foyer={
      idFoyer : null,
      nomFoyer: null,
      capaciteFoyer:null
    }
  }

  getAllfoyer(){
    return this.contraService.getAllfoyer().subscribe(res=>{
      this.listfoyers = res;
    });
  }
  addfoyer(c: any) {
    this.contraService.addfoyer(c).subscribe(() => {
      this.getAllfoyer();
      this.form = false;
    });
  }

  editfoyer(foyer: foyer) {
    this.contraService.editfoyer(foyer).subscribe();
  }

  open(content: any, action: any) {
    if (action != null)
      this.foyer = action
    else
      this.foyer = new foyer();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.form = false;
  }
}