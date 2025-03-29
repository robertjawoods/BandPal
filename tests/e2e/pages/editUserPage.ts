import { Page } from '@playwright/test';

export class EditUserPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToEditPage() {
        await this.page.click('text=Account');
        await this.page.click('text=Edit');
        await this.page.waitForURL(/\/user\/edit\/[0-9a-fA-F-]{36}$/);
    }

    async fillName(name: string) {
        await this.page.fill('input[name="name"]', name);
    }

    async fillBio(bio: string) {
        await this.page.fill('textarea[name="bio"]', bio);
    }

    async fillLocation(location: string) {
        await this.page.fill('input[name="location"]', location);
    }

    async saveChanges() {
        await this.page.click('text=Save');
        await this.page.waitForURL(/\/user\/[0-9a-fA-F-]{36}$/);
    }

    async getName() {
        return this.page.getByTestId('name');
    }

    async getBio() {
        return this.page.getByTestId('bio');
    }

    async getLocation() {
        return this.page.getByTestId('location');
    }

    async getRoles() {
        return this.page.getByTestId('roles');
    }
}