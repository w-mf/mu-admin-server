import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as puppeteer from 'puppeteer';
@Injectable()
export class PuppeteerDemoService {
  // 爬虫 demo
  // constructor() {}
  // 网易云飙升榜
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async wyyMusicSoarList() {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto('https://music.163.com/#/discover/toplist', {
      waitUntil: 'networkidle0',
    });
    const data = [];
    const contentFrame = page.frames().find((frame) => frame.name() === 'contentFrame');
    const list = await contentFrame.$x('.//div[@id="toplist"]//tbody//tr');

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const info = { id: '', name: '', singer: '', duration: '', img: '' };
      const td2a = await item.$x('.//td[2]//div[@class="ttc"]//a');

      if (td2a.length) {
        info.id = (await contentFrame.evaluate((el) => el.getAttribute('href'), td2a[0])).split('id=')[1];
        info.name = await contentFrame.evaluate((el) => el.getAttribute('title'), await td2a[0].$('b'));
      }

      const td3dur = await item.$x('.//td[3]//span[@class="u-dur "]');
      const td3img = await item.$x('.//td[3]//span[@data-res-action="share"]');
      if (td3dur.length) info.duration = await contentFrame.evaluate((el) => el.innerHTML, td3dur[0]);
      if (td3img.length) info.img = await contentFrame.evaluate((el) => el.getAttribute('data-res-pic'), td3img[0]);

      const td4div = await item.$x('.//td[4]//div[@class="text"]');
      if (td4div.length) info.singer = await contentFrame.evaluate((el) => el.getAttribute('title'), td4div[0]);
      data.push(info);
    }
    console.log(data);
    await page.close();
    await browser.close();
  }
}
