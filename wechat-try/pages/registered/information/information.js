import request from '../../../utils/request'

const app = getApp()

const provinceData = ["北京", "天津", "上海", "重庆", "黑龙江", "吉林", "辽宁", "河北", "山东", "江苏", "安徽", "浙江", "福建", "广东", "海南", "云南", "贵州", "四川", "湖南", "湖北", "河南", "山西", "陕西", "甘肃", "青海", "江西", "新疆", "西藏", "宁夏", "内蒙古", "广西", "台湾", "香港"];
const cityData = {
    '上海': ["上海"], '云南':  ["昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "安宁", "宣威", "个旧", "开远", "景洪", "楚雄", "大理", "潞西", "瑞丽 "], '内蒙古':  ["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布 ", "霍林郭勒", "满洲里", "牙克石", "扎兰屯", "根河", "额尔古纳", "丰镇", "锡林浩特", "二连浩特", "乌兰浩特", "阿尔山"],
    '北京': ["北京"], '台湾':  ["台北", "台中", "基隆", "高雄", "台南", "新竹", "嘉义", "板桥", "宜兰", "竹北", "桃园", "苗栗", "丰原", "彰化", "南投", "太保", "斗六", "新营", "凤山", "屏东", "台东", "花莲", "马公"], '吉林':  ["长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "九台", "榆树", "德惠", "舒兰", "桦甸", "蛟河", "磐石", "公主岭", "双辽", "梅河口", "集安", "临江", "大安", "洮南", "延吉", "图们", "敦化", "龙井", "珲春", "和龙"],
    '四川': ["成都", "绵阳", "德阳", "广元", "自贡", "攀枝花", "乐山", "南充", "内江", "遂宁", "广安", "泸州", "达州", "眉山", "宜宾", "雅安", "资阳", "都江堰", "彭州", "邛崃", "崇州", "广汉", "什邡", "绵竹", "江油", "峨眉山", "阆中", "华蓥", "万源", "简阳", "西昌"], '天津': ["天津"], '宁夏':["银川", "石嘴山", "吴忠", "固原", "中卫", "青铜峡", "灵武 "], '安徽':["合肥", "蚌埠", "芜湖", "淮南", "亳州", "阜阳", "淮北", "宿州", "滁州", "安庆", "巢湖", "马鞍山", "宣城", "黄山", "池州", "铜陵", "界首", "天长", "明光", "桐城", "宁国"],
    '山东':["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "莱芜", "临沂", "德州", "聊城", "菏泽", "滨州", "章丘", "胶南", "胶州", "平度", "莱西", "即墨", "滕州", "龙口", "莱阳", "莱州", "招远", "蓬莱", "栖霞", "海阳", "青州", "诸城", "安丘", "高密", "昌邑", "兖州", "曲阜", "邹城", "乳山", "文登", "荣成", "乐陵", "临清", "禹城"],
    '山西':["太原", "大同", "忻州", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "临汾", "吕梁", "古交", "潞城", "高平", "介休", "永济", "河津", "原平", "侯马", "霍州", "孝义", "汾阳"], '广东':["广州", "深圳", "汕头", "惠州", "珠海", "揭阳", "佛山", "河源", "阳江", "茂名", "湛江", "梅州", "肇庆", "韶关", "潮州", "东莞", "中山", "清远", "江门", "汕尾", "云浮",  "从化", "乐昌", "南雄", "台山", "鹤山", "恩平", "廉江", "雷州", "吴川", "高州", "化州", "高要", "四会", "兴宁", "陆丰", "阳春", "英德", "连州", "普宁", "罗定"],
    '广西':["南宁", "柳州", "桂林", "梧州", "北海", "崇左", "来宾", "贺州", "玉林", "百色", "河池", "钦州", "防城港", "贵港 ", "岑溪", "凭祥", "合山", "北流", "宜州", "东兴", "桂平"], '新疆':["乌鲁木齐", "克拉玛依", "石河子", "阿拉尔", "图木舒克", "五家渠", "哈密", "吐鲁番", "阿克苏", "喀什", "和田", "伊宁", "塔城", "阿勒泰", "奎屯", "博乐", "昌吉", "阜康", "库尔勒", "阿图什", "乌苏 "], '江苏':["南京", "镇江", "常州", "无锡", "苏州", "徐州", "连云港", "淮安", "盐城", "扬州", "泰州", "南通", "宿迁", "江阴", "宜兴", "邳州", "新沂", "金坛", "溧阳", "常熟", "张家港", "太仓", "昆山", "吴江", "如皋", "通州", "海门", "启东", "东台", "大丰", "高邮", "江都", "仪征", "丹阳", "扬中", "句容", "泰兴", "姜堰", "靖江", "兴化 "],
    '江西':["南昌", "九江", "赣州", "吉安", "鹰潭", "上饶", "萍乡", "景德镇", "新余", "宜春", "抚州", "乐平", "瑞昌", "贵溪", "瑞金", "南康", "井冈山", "丰城", "樟树", "高安", "德兴"], '河北':["石家庄", "唐山", "邯郸", "秦皇岛", "保定", "张家口", "承德", "廊坊", "沧州", "衡水", "邢台 ", "辛集", "藁城", "晋州", "新乐", "鹿泉", "遵化", "迁安", "武安", "南宫", "沙河", "涿州", "定州", "安国", "高碑店", "泊头", "任丘", "黄骅", "河间", "霸州", "三河", "冀州", "深州"],
    '河南':["郑州", "洛阳", "开封", "漯河", "安阳", "新乡", "周口", "三门峡", "焦作", "平顶山", "信阳", "南阳", "鹤壁", "濮阳", "许昌", "商丘", "驻马店", "巩义", "新郑", "新密", "登封", "荥阳", "偃师", "汝州", "舞钢", "林州", "卫辉", "辉县", "沁阳", "孟州", "禹州", "长葛", "义马", "灵宝", "邓州", "永城", "项城", "济源"], '浙江':["杭州", "嘉兴", "湖州", "宁波", "金华", "温州", "丽水", "绍兴", "衢州", "舟山", "台州", "建德", "富阳", "临安", "余姚", "慈溪", "奉化", "瑞安", "乐清", "海宁", "平湖", "桐乡", "诸暨", "上虞", "嵊州", "兰溪", "义乌", "东阳", "永康", "江山", "临海", "温岭", "龙泉"], '海南':["三沙", "海口", "三亚", "琼海", "文昌", "万宁", "五指山", "儋州", "东方"],
    '湖北':["武汉", "襄樊", "宜昌", "黄石", "鄂州", "随州", "荆州", "荆门", "十堰", "孝感", "黄冈", "咸宁", "大冶", "丹江口", "洪湖", "石首", "松滋", "宜都", "当阳", "枝江", "老河口", "枣阳", "宜城", "钟祥", "应城", "安陆", "汉川", "麻城", "武穴", "赤壁", "广水", "仙桃", "天门", "潜江", "恩施", "利川"], '湖南':["长沙", "株洲", "湘潭", "衡阳", "岳阳", "郴州", "永州", "邵阳", "怀化", "常德", "益阳", "张家界", "娄底", "浏阳", "醴陵", "湘乡", "韶山", "耒阳", "常宁", "武冈", "临湘", "汨罗", "津", "沅江", "资兴", "洪江", "冷水江", "涟源", "吉首"], '甘肃':["兰州", "天水", "平凉", "酒泉", "嘉峪关", "金昌", "白银", "武威", "张掖", "庆阳", "定西", "陇南 ", "玉门", "敦煌", "临夏", "合作"],
    '福建':["福州", "厦门", "泉州", "三明", "南平", "漳州", "莆田", "宁德", "龙岩", "福清", "长乐", "永安", "石狮", "晋江", "南安", "龙海", "邵武", "武夷山", "建瓯", "建阳", "漳平", "福安", "福鼎"],
    '西藏':["拉萨", "昌都", "日喀则", "林芝"], '贵州':["贵阳", "六盘水", "遵义", "安顺", "清镇", "赤水", "仁怀", "铜仁", "毕节", "兴义", "凯里", "都匀", "福泉"], '辽宁':["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛", "新民", "瓦房店", "普兰店", "庄河", "海城", "东港", "凤城", "凌海", "北镇", "大石桥", "盖州", "灯塔", "调兵山", "开原", "凌源", "北票", "兴城 "],
    '重庆':["重庆"], '陕西':["西安", "咸阳", "铜川", "延安", "宝鸡", "渭南", "汉中", "安康", "商洛", "榆林", "兴平", "韩城", "华阴"], '青海':["西宁", "格尔木", "德令哈 "], '香港':["香港"], '黑龙江':["哈尔滨", "大庆", "齐齐哈尔", "佳木斯", "鸡西", "鹤岗", "双鸭山", "牡丹江", "伊春", "七台河", "黑河", "绥化", "五常", "双城", "尚志", "纳河", "虎林", "密山", "铁力", "同江", "富锦", "绥芬河", "海林", "宁安", "穆林", "北安", "五大连池", "肇东", "海伦", "安达"]
};

Page({
    data: {
        gender:null,
        array: ['00', '95', '90', '85', '80', '75', '70'],
        index:0,
        city:"北京",
        cityData:["北京"],
        province:"北京",
        provinceData:provinceData,
    },

    onLoad: function () {

    },
    chooseMan:function(){
        this.setData({
            gender:3
        })
    },
    chooseWoman:function(){
        this.setData({
            gender:5
        })
    },
    bindChange: function (e) {
        const val = e.detail.value
        this.setData({
            cityData:cityData[provinceData[val[0]]],
            province:provinceData[val[0]],
            city:cityData[provinceData[val[0]]][val[1]]
        })
    },
    next:function () {
        let { province, index, gender, array, city} = this.data
        wx.navigateTo({
            url:`/pages/registered/label/label?gender=${gender}&age=${array[index]}&city=${city}&province=${province}`,
        })
    }
})
