import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()


export class MailService {
    constructor(private httpClient: HttpClient) {

    }

    sendEmail() {
        let endpointURL = 'https://cluboto.net/webservice/service_post.php'
        let body = new HttpParams({
            fromObject: {
                act: 'sending-email',
                receiver: 'tho@enablecode.vn',
                sender: 'Tho Tran Phuoc',
                subject: 'New appointment',
                textbody: '<strong>Hi</strong>, New message'
            }
        })
        return this.httpClient.post(endpointURL, body)
    }

    sendEmail2Notify(Email: string, Name: string, SUBJECT: string, TEXTBODY: string) {
        let endpointURL = 'https://cluboto.net/webservice/service_post.php'
        let body = new HttpParams({
            fromObject: {
                act: 'sending-email',
                receiverEmail: Email,
                receiverName: Name,
                subject: SUBJECT,
                textbody: TEXTBODY
            }
        });
        return this.httpClient.post(endpointURL, body);
    }

    sendEmail2NotifyCaseSubmitted(REF_LEAD_EMAIL: string) {
        let subject = 'New Patient submitted by Referral';
        let body = 'New Patient was just submitted by Referral. Please check. Thanks';
        let name = 'Referral Lead';
        return this.sendEmail2Notify(REF_LEAD_EMAIL, name, subject, body);
    };

    sendEmail2NotifyCaseAccepted(MA_EMAIL: string) {
        let subject = 'New Patient accepted by Ref Lead';
        let body = 'New Patient was just accepted  by Ref Lead. Please check. Thanks';
        let name = 'MoveAbility';
        return this.sendEmail2Notify(MA_EMAIL, name, subject, body);
    };

    sendEmail2NotifyCaseInvitted(SVP_EMAIL: string) {
        let subject = 'New Patient approved and invitation sent by MoveAbility';
        let body = 'New Patient was just approved and invitation sent by MoveAbility. Please check. Thanks';
        let name = 'Service Provider';
        return this.sendEmail2Notify(SVP_EMAIL, name, subject, body);
    };

}