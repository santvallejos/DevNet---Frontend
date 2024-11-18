import { Component } from '@angular/core';
import { FlowbiteService } from '../../services/flowbite.service';
/* Components ux-ui */
import { ButtonLikeComponent } from '../../shared/button-like/button-like.component';
import { ButtonSaveComponent } from '../../shared/button-save/button-save.component';
import { ButtonCommentComponent } from '../../shared/button-comment/button-comment.component';


@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [ButtonSaveComponent, ButtonLikeComponent, ButtonCommentComponent],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {

  constructor(private flowbiteService: FlowbiteService) {}

  //Llamar al servicio
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}
