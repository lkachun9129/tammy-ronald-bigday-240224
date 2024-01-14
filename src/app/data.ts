import { EventInput, Package } from "./models";

export interface AppData {
    schedules: EventInput[];
    gears: Package[];
}

export const AppData: AppData =

{
    schedules: [{
        startDateTime: '23/2 15:00',
        duration: 15,
        description: `酒店check in`,
        venue: 'Room 11',
        participants: [],
        gears: [],
        remarks: ['1) 買湯圓+渣渣?']
    }, {
        startDateTime: '23/2 23:00',
        duration: 15,
        description: `Ronald上頭`,
        venue: 'Mei Foo',
        participants: ['Ronald', 'Ronald爸'],
        gears: ['上頭套裝 (男家)', '龍鳳燭 (男家)', '紅頭繩 (男家)', '龍鳳對餅 (男家)', '紅枱布 (男家)', '紅睡衣 (男家)', '紅拖鞋 (男家)', '紅底衫褲 (男家)', '碌柚葉', '湯圓', '水果'],
        remarks: ['1) 男家上頭完成後電話通', '知女家上頭']
    }, {
        startDateTime: '23/2 23:15',
        duration: 15,
        description: `Tammy上頭`,
        venue: 'Room 11',
        participants: ['Tammy', 'Tammy媽'],
        gears: ['上頭套裝 (女家)', '電子龍鳳燭 (女家)', '紅頭繩 (女家)', '龍鳳對餅 (女家)', '紅枱布 (女家)', '紅睡衣 (女家)', '紅拖鞋 (女家)', '紅底衫褲 (女家)', '扁柏', '碌柚葉', '湯圓', '水果'],
        remarks: []
    }, {
        startDateTime: '24/2 05:00',
        duration: 60,
        description: `姊妹化妝+換裝`,
        venue: 'Room 11',
        participants: ['所有姊妹'],
        gears: ['姊妹手花'],
        remarks: []
    }, {
        startDateTime: '24/2 05:00',
        duration: 60,
        description: `Tammy媽化妝+換裝`,
        venue: 'Room 11',
        participants: ['Tammy媽'],
        gears: ['Tammy媽媽晚裝', 'Tammy媽媽晚裝鞋', 'Tammy家人襟花'],
        remarks: []
    }, {
        startDateTime: '24/2 06:00',
        duration: 60,
        description: `食早餐`,
        venue: 'Room 11',
        participants: ['Tammy', 'Tammy媽', '所有姊妹'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 07:00',
        duration: 30,
        description: `著褂`,
        venue: 'Room 11',
        participants: ['Tammy', 'Tammy媽', '姊妹A', '姊妹B'],
        gears: ['裙褂', '褂鞋', '金器'],
        remarks: ['1) 安排兩位身高相若的姊妹協助', '2) Tammy媽對新娘講心底話']
    }, {
        startDateTime: '24/2 07:00',
        duration: 15,
        description: `Tammy家人集合`,
        venue: 'Room 11',
        participants: ['Tammy家人'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 07:15',
        duration: 15,
        description: `準備接新娘`,
        venue: 'Room 11',
        participants: ['姊妹C', '姊妹D', '姊妹E'],
        gears: ['玩新郎道具', '攔門紅色花球 (同心結+ 紅絲帶）', '敬茶cushion', '敬茶葉杯及水壺', '紅紙杯', '蓮子+ 紅棗+ 茶葉'],
        remarks: ['1) Lock the connecting door between two rooms']
    }, {
        startDateTime: '24/2 07:30',
        duration: 30,
        description: `拍攝新娘及姊妹花絮`,
        venue: 'Room 11',
        participants: ['Tammy', '所有姊妹'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 08:00',
        duration: 15,
        description: `遊戲時間`,
        venue: 'Room 11',
        participants: ['Tammy', 'Ronald', '所有兄弟姊妹', 'Tammy家人'],
        gears: ['玩新郎道具', '攔門紅色花球 (同心結+ 紅絲帶）', '腳架'],
        remarks: ['1) Tammy大哥setup腳架直播遊戲時間']
    }, {
        startDateTime: '24/2 08:15',
        duration: 15,
        description: `接新娘`,
        venue: 'Room 11',
        participants: ['Tammy', 'Ronald', '所有兄弟姊妹', 'Tammy家人'],
        gears: [],
        remarks: ['1) 所有兄弟姊妹做佈景板', '2) 爸爸帶新娘出來', '接新娘步驟', '1) 愛的宣言 (1min) [Ronald]', '2) 愛的宣言 (1min) [Tammy]', '3) 送花球', '4) 鍚錫']
    }, {
        startDateTime: '24/2 08:30',
        duration: 30,
        description: `Tammy家人斟茶+拍攝全家福`,
        venue: 'Room 11',
        participants: ['Ronald', 'Tammy', 'Tammy家人', '所有姊妹'],
        gears: ['斟茶金器表', '原子筆', '金器', '金器回收袋', '敬茶cushion', '敬茶葉杯及水壺', '紅紙杯', '蓮子+ 紅棗+ 茶葉'],
        remarks: ['安排一位口才好的姊妹讀敬茶金句', '斟茶次序', '1) Tammy爸媽', '2) Tammy大哥', '3) Tammy二哥']
    }, {
        startDateTime: '24/2 08:30',
        duration: 30,
        description: `準備出門物資`,
        venue: 'Room 11',
        participants: [],
        gears: ['紅傘'],
        remarks: ['1) Unlock the connecting door between two rooms']
    }, {
        startDateTime: '24/2 09:00',
        duration: 15,
        description: `出門環節`,
        venue: '酒店大堂',
        participants: ['Tammy', 'Ronald', '所有兄弟姊妹'],
        gears: [],
        remarks: ['1) 上車兜去迴旋處轉個圈', '2) 撥米', '3) 安排一位身高相約姊妹擔遮', '4) 新郎新娘一齊左腳出先']
    }, {
        startDateTime: '24/2 09:15',
        duration: 15,
        description: `Ronald家人斟茶+拍攝全家福`,
        venue: 'Room 11',
        participants: ['Ronald', 'Tammy', '所有姊妹', 'Ronald家人'],
        gears: ['斟茶金器表', '原子筆', '金器', '金器回收袋', '敬茶cushion', '敬茶葉杯及水壺', '紅紙杯', '蓮子+ 紅棗+ 茶葉'],
        remarks: ['1) 安排一位口才好的姊妹讀敬茶金句', '2) 食湯圓', '3) 入門時Ronald媽在睡房等待', '斟茶次序', '1) Ronald爸媽']
    }, {
        startDateTime: '24/2 09:30',
        duration: 60,
        description: `新娘換裝`,
        venue: 'Room 11',
        participants: ['Tammy', '化妝師'],
        gears: ['外拍婚紗', 'Nude bra', '新娘鞋', '抹身布'],
        remarks: []
    }, {
        startDateTime: '24/2 10:30',
        duration: 45,
        description: `Brunch`,
        venue: '0',
        participants: ['所有兄弟姊妹'],
        gears: [],
        remarks: ['叫外賣?']
    }, {
        startDateTime: '24/2 11:15',
        duration: 15,
        description: `香港遨凱酒店 --> 西九`,
        venue: '0',
        participants: ['Ronald', 'Tammy', '所有兄弟姊妹', '攝影師', '化妝師'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 11:30',
        duration: 60,
        description: `外拍`,
        venue: '西九',
        participants: ['Ronald', 'Tammy', '所有兄弟姊妹', '攝影師', '化妝師'],
        gears: ['證婚花球', 'Tammy外套'],
        remarks: []
    }, {
        startDateTime: '24/2 12:30',
        duration: 15,
        description: `西九 --> sky100`,
        venue: '0',
        participants: ['Ronald', 'Tammy', '所有兄弟姊妹', '攝影師', '化妝師'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 12:45',
        duration: 60,
        description: `新娘換裝`,
        venue: '新娘房(sky100)',
        participants: ['Tammy', '化妝師'],
        gears: ['證婚婚紗', 'Nude bra', '頭紗', '新娘鞋', '證婚花球'],
        remarks: []
    }, {
        startDateTime: '24/2 13:45',
        duration: 15,
        description: `影冚頭紗相`,
        venue: '新娘房(sky100)',
        participants: ['Tammy', 'Tammy爸', '攝影師'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 14:00',
        duration: 15,
        description: `律師點名`,
        venue: '新娘房(sky100)',
        participants: ['Tammy', 'Tammy爸', 'Ronald', 'Ronald爸', '律師', '姊妹Winglam', '兄弟XX'],
        gears: ['[律師袋]'],
        remarks: ['1) [律師袋]姊妹Winglam跟身', '2) 姊妹Winglam貼身緊隨律師']
    }, {
        startDateTime: '24/2 14:00',
        duration: 15,
        description: `佈置證婚枱`,
        venue: 'sky100',
        participants: ['律師', '姊妹Winglam'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 14:00',
        duration: 15,
        description: `律師briefing`,
        venue: '新娘房(sky100)',
        participants: ['Tammy', 'Tammy爸', 'Ronald', 'Ronald爸', '律師', '姊妹Winglam', '兄弟XX'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 14:15',
        duration: 15,
        description: `最後綵排`,
        venue: '新娘房(sky100)',
        participants: ['Tammy', 'Tammy爸', 'Ronald', '律師'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 14:30',
        duration: 30,
        description: `證婚儀式`,
        venue: 'sky100',
        participants: [],
        gears: ['[律師袋]', '證婚花球', '花瓣'],
        remarks: []
    }, {
        startDateTime: '24/2 15:00',
        duration: 105,
        description: `酒會`,
        venue: 'sky100',
        participants: [],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 16:45',
        duration: 30,
        description: `大門送別賓客`,
        venue: '0',
        participants: ['Ronald', 'Tammy'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 17:15',
        duration: 30,
        description: `清場`,
        venue: '0',
        participants: ['sky100'],
        gears: ['Foamboard相x12', 'backdrop名牌', '紅白酒'],
        remarks: ['1) 向Mindwood回收Foamboard相及backdrop名牌']
    }, {
        startDateTime: '24/2 17:15',
        duration: 30,
        description: `準備move out`,
        venue: '0',
        participants: [],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 17:45',
        duration: 15,
        description: `sky100 --> 囍雲軒`,
        venue: '0',
        participants: [],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 18:00',
        duration: 30,
        description: `新娘化裝`,
        venue: '新娘房(囍雲軒)',
        participants: ['Tammy', '化妝師'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 18:30',
        duration: 60,
        description: `晚宴恭候`,
        venue: '囍雲軒',
        participants: [],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 18:30',
        duration: 60,
        description: `Tammy親人斟茶`,
        venue: '囍雲軒',
        participants: [],
        gears: ['紅紙杯', '斟茶金器表', '原子筆', '金器', '金器回收袋', '敬茶cushion', '敬茶葉杯及水壺', '紅紙杯', '蓮子+ 紅棗+ 茶葉'],
        remarks: []
    }, {
        startDateTime: '24/2 19:30',
        duration: 15,
        description: `晚宴入席`,
        venue: '0',
        participants: [],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 19:45',
        duration: 15,
        description: `March in`,
        venue: '囍雲軒',
        participants: [],
        gears: ['證婚花球', '花瓣'],
        remarks: []
    }, {
        startDateTime: '24/2 20:00',
        duration: 15,
        description: `開席上菜`,
        venue: '囍雲軒',
        participants: [],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 20:15',
        duration: 15,
        description: `第二道菜`,
        venue: '囍雲軒',
        participants: [],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 20:15',
        duration: 60,
        description: `新娘換裝`,
        venue: '新娘房(囍雲軒)',
        participants: ['Tammy', '化妝師'],
        gears: ['敬酒晚裝', '金器'],
        remarks: []
    }, {
        startDateTime: '24/2 20:15',
        duration: 60,
        description: `新郎換裝`,
        venue: '新娘房(囍雲軒)',
        participants: ['Ronald'],
        gears: ['敬酒禮服'],
        remarks: []
    }, {
        startDateTime: '24/2 21:15',
        duration: 15,
        description: `敬酒`,
        venue: '0',
        participants: ['Ronald', 'Tammy', '所有兄弟姊妹'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 22:45',
        duration: 15,
        description: `宴會結束`,
        venue: '囍雲軒',
        participants: [],
        gears: [],
        remarks: []
    }, {
        startDateTime: '23/2 15:00',
        duration: 15,
        description: `酒店check in`,
        venue: 'Room 10',
        participants: [],
        gears: [],
        remarks: []
    }, {
        startDateTime: '23/2 20:00',
        duration: 15,
        description: `房間佈置`,
        venue: 'Room 11',
        participants: ['Tammy', '所有姊妹'],
        gears: ['房間deco', '對聯', '膠紙', 'bluetack (可能唔夠實)', '皺紋膠紙', '索帶', '剪刀'],
        remarks: []
    }, {
        startDateTime: '24/2 05:30',
        duration: 30,
        description: `買早餐 or 麥麥送`,
        venue: 'Mei Foo McDonald',
        participants: [],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 06:00',
        duration: 15,
        description: `集合@香港遨凱酒店`,
        venue: 'Room 10',
        participants: ['Ronald', '所有兄弟', '車手'],
        gears: [],
        remarks: ['泊車後通知車位號碼']
    }, {
        startDateTime: '24/2 06:00',
        duration: 15,
        description: `交早餐比姊妹`,
        venue: 'Room 11',
        participants: ['兄弟X', '姊妹X'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 06:00',
        duration: 60,
        description: `兄弟May化妝`,
        venue: 'Room 10',
        participants: ['化妝師'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 06:00',
        duration: 60,
        description: `食早餐`,
        venue: '0',
        participants: ['Ronald', '所有兄弟', '車手'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 07:00',
        duration: 30,
        description: `花車佈置`,
        venue: '0',
        participants: ['Ronald', '所有兄弟', '車手'],
        gears: ['花車deco	', '花環', '車花x4', '皺紋膠紙', '結婚公仔', '索帶', '剪刀'],
        remarks: []
    }, {
        startDateTime: '24/2 07:15',
        duration: 15,
        description: `新郎換裝`,
        venue: 'Room 10',
        participants: ['Ronald'],
        gears: ['馬褂', '新郎襟花'],
        remarks: []
    }, {
        startDateTime: '24/2 07:15',
        duration: 15,
        description: `兄弟換裝`,
        venue: 'Room 10',
        participants: ['所有兄弟'],
        gears: ['兄弟襟花', 'Ronald家人襟花'],
        remarks: []
    }, {
        startDateTime: '24/2 07:30',
        duration: 30,
        description: `準備接新娘`,
        venue: 'Room 10',
        participants: ['Ronald', '所有兄弟'],
        gears: ['入門花球', '開門利是'],
        remarks: []
    }, {
        startDateTime: '24/2 08:00',
        duration: 30,
        description: `Ronald家人集合`,
        venue: 'Room 10',
        participants: ['Ronald家人'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 08:00',
        duration: 45,
        description: `Ronald家人化妝`,
        venue: 'Room 10',
        participants: ['Ronald家人'],
        gears: ['Ronald家人襟花'],
        remarks: ['1) Ronald媽', '2) Ronald妹']
    }, {
        startDateTime: '24/2 08:30',
        duration: 30,
        description: `準備出門物資`,
        venue: 'Room 10',
        participants: ['兄弟'],
        gears: ['紅米綠豆'],
        remarks: []
    }, {
        startDateTime: '24/2 08:45',
        duration: 15,
        description: `接待Ronald家人`,
        venue: '0',
        participants: ['兄弟Norman'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 09:00',
        duration: 15,
        description: `交換房間`,
        venue: '0',
        participants: ['Ronald家人', 'Tammy家人'],
        gears: [],
        remarks: ['1) 兩家人不能碰面']
    }, {
        startDateTime: '24/2 09:00',
        duration: 15,
        description: `準備入門物資`,
        venue: 'Room 11',
        participants: ['所有兄弟姊妹'],
        gears: ['湯圓', '紅紙碗 + 匙羹'],
        remarks: ['1) 斟茶物資', '2) 湯圓']
    }, {
        startDateTime: '24/2 09:30',
        duration: 75,
        description: `收拾物質for check out`,
        venue: '0',
        participants: ['所有兄弟姊妹'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 09:30',
        duration: 15,
        description: `新郎換裝`,
        venue: 'Room 11',
        participants: ['Ronald'],
        gears: ['Match in禮服', 'bow tie', '皮鞋', '黑襪'],
        remarks: []
    }, {
        startDateTime: '24/2 10:45',
        duration: 30,
        description: `搬物資上車`,
        venue: '0',
        participants: ['Ronald', '所有兄弟姊妹'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 12:30',
        duration: 15,
        description: `香港遨凱酒店 --> sky100`,
        venue: '0',
        participants: ['Ronald家人', 'Tammy家人'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 12:45',
        duration: 75,
        description: `佈置
檢查音樂`,
        venue: 'sky100',
        participants: [],
        gears: ['人情回收袋', '回禮禮物', '人名人情表', '原子筆', 'USB for相歌片', '嘉賓心心簽名板', '簽名布', '簽名板筆', '鐵牌 Welcome board', '人情利是封', '相簿x2', '油畫x1', '玫瑰花'],
        remarks: []
    }, {
        startDateTime: '24/2 12:45',
        duration: 15,
        description: `準備律師袋
確認證婚枱位置`,
        venue: 'sky100',
        participants: ['姊妹Winglam'],
        gears: ['[律師袋] 2枝swarovski筆', '[律師袋] 戒指 (一盒兩戒)', '[律師袋] 結婚證書套', '[律師袋] HKID正本 x4'],
        remarks: []
    }, {
        startDateTime: '24/2 12:45',
        duration: 60,
        description: `Lunch Time`,
        venue: '0',
        participants: ['攝影師'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 15:15',
        duration: 60,
        description: `Lunch Time`,
        venue: '0',
        participants: ['化妝師'],
        gears: [],
        remarks: []
    }, {
        startDateTime: '24/2 18:00',
        duration: 30,
        description: `佈置`,
        venue: '囍雲軒',
        participants: [],
        gears: ['回禮禮物', '人名人情表', '原子筆', 'USB for相歌片', '嘉賓心心簽名板', '簽名布', '簽名板筆', '鐵牌 Welcome board', '人情利是封', '相簿x2', '油畫x1', 'Foamboard相x12', 'backdrop名牌', '玫瑰花', '剪刀', '紅白酒'],
        remarks: ['以下物品可早一天交給囍雲軒', '1) 回禮禮物', '2) 囍雲軒訂單']
    }],
    gears: [{
        box: 'A1',
        description: 'Room 11 -> Home',
        color: '#a52418',
        items: ['上頭套裝 (女家)', '電子龍鳳燭 (女家)', '紅頭繩 (女家)', '龍鳳對餅 (女家)', '紅枱布 (女家)', '碌柚葉', '扁柏', '對聯']
    }, {
        box: 'A2',
        description: '',
        color: '#edc244',
        items: ['花車deco	', '花環', '車花x4', '結婚公仔', '紅米綠豆']
    }, {
        box: 'B',
        description: 'Room 11 -> 囍雲軒 -> Home',
        color: '#a3cd63',
        items: ['玩新郎道具', '敬茶cushion', '敬茶葉杯及水壺', '紅紙杯', '蓮子+ 紅棗+ 茶葉', '斟茶金器表', '金器回收袋', '腳架', '紅紙碗 + 匙羹']
    }, {
        box: 'D',
        description: 'sky100 -> 囍雲軒 -> Home',
        color: '#68aeea',
        items: ['[律師袋]', '花瓣', '人情回收袋', '人名人情表', '簽名布', '簽名板筆', '鐵牌 Welcome board', '人情利是封', '相簿x2', '玫瑰花', '[律師袋] 2枝swarovski筆', '[律師袋] 戒指 (一盒兩戒)', '[律師袋] 結婚證書套']
    }, {
        box: 'S',
        description: '文具袋',
        color: '#cfcece',
        items: ['原子筆', '房間deco', '膠紙', 'bluetack (可能唔夠實)', '皺紋膠紙', '索帶', '剪刀']
    }, {
        box: 'GIP A',
        description: 'Room 11 -> Room 10 -> Home',
        color: '#af5f29',
        items: ['紅睡衣 (女家)', '紅拖鞋 (女家)', '紅底衫褲 (女家)', '姊妹手花', 'Tammy媽媽晚裝', 'Tammy媽媽晚裝鞋', 'Tammy家人襟花', '裙褂', '褂鞋', '馬褂', '新郎襟花', '兄弟襟花', 'Ronald家人襟花']
    }, {
        box: 'GIP B',
        description: 'Room 10 -> Room 11 -> sky100 -> 囍雲軒 -> Home',
        color: '#b19030',
        items: ['外拍婚紗', 'Nude bra', '新娘鞋', '抹身布', 'Tammy外套', '證婚婚紗', '頭紗', '敬酒禮服', 'Match in禮服', 'bow tie', '皮鞋', '黑襪', '敬酒晚裝']
    }, {
        box: 'X',
        description: '獨立包裝物品',
        color: '#eadafc',
        items: ['金器', '攔門紅色花球 (同心結+ 紅絲帶）', '紅傘', '證婚花球', '入門花球', '回禮禮物', 'USB for相歌片', '嘉賓心心簽名板', '油畫x1', 'Foamboard相x12', 'backdrop名牌', '紅白酒']
    }]
}

    ;