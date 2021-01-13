import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from 'src/app/shared/classes/user';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private unsubscribe: Subject<void> = new Subject<void>();
  
  public columns: string[] = ['firstname', 'lastname','email','groups' ];
  public users: User[];
  

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.initUsers();
  }

  private initUsers(): void {
    this.usersService.getUsers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.users = res;
      });
  }
  
}
