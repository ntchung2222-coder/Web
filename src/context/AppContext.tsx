import * as React from "react";

type Theme = "light" | "dark";
type Language = "en" | "vi";

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    tournaments: "Tournaments",
    schedule: "Schedule",
    players: "Players",
    clubs: "Clubs & Venues",
    settings: "Settings",
    overview: "Overview",
    matches: "Matches",
    brackets: "Brackets",
    prizes: "Prizes",
    register: "Register Now",
    ongoing: "Ongoing",
    upcoming: "Upcoming",
    finished: "Finished",
    live: "Live",
    about: "About Tournament",
    systemOnline: "SYSTEM ONLINE",
    welcomeBack: "Welcome back, here's what's happening today.",
    mainMenu: "Main Menu",
    director: "Tournament Director",
    createTournament: "Create Tournament",
    registration: "Registration",
    draw: "Draw",
    results: "Results",
    venue: "Venue",
    organizer: "Organizer",
    fee: "Fee",
    deadline: "Deadline",
    category: "Category",
    status: "Status",
    actions: "Actions",
    save: "Save",
    cancel: "Cancel",
    next: "Next",
    back: "Back",
    finish: "Finish",
    search: "Search",
    filter: "Filter",
    addPlayer: "Add Player",
    checkIn: "Check-in",
    payment: "Payment",
    seed: "Seed",
    autoDraw: "Auto Draw",
    generateMatches: "Generate Matches",
    score: "Score",
    inning: "Inning",
    avg: "Average",
    highRun: "High Run",
    winner: "Winner",
    table: "Table",
    time: "Time",
    featuredEvent: "Featured Event",
    prizePool: "Total Prize Pool",
    registeredPlayers: "Registered Players",
    aboutTournament: "About Tournament",
    sponsors: "Sponsors",
    allRounds: "All Rounds",
    liveOnly: "Live Only",
    viewDetails: "View Details",
    bracketsUpdating: "Brackets Updating",
    bracketsUpdatingDesc: "The tournament bracket will be available once the group stage is completed.",
    refresh: "Refresh",
    viewAll: "View All",
    additionalPrizes: "Additional Prizes",
    rank: "Rank",
    clubVenue: "Club / Venue",
    discipline: "Discipline",
    eloRating: "Elo Rating",
    exportIcal: "Export iCal",
    fullCalendar: "Full Calendar",
    trackMatches: "Track all matches and events across the tournament.",
    discoverClubs: "Discover and manage billiards venues in your area.",
    registerClub: "Register Club",
    tournamentName: "Tournament Name",
    description: "Description",
    startDate: "Start Date",
    endDate: "End Date",
    selectClub: "Select Club",
    tournamentCategories: "Tournament Categories",
    addCategory: "Add Category",
    targetPoints: "Target Points",
    readyToLaunch: "Ready to Launch!",
    readyToLaunchDesc: "Review your settings and click finish to publish the tournament.",
    startTournament: "Start Tournament",
    registrationList: "Registration List",
    exportExcel: "Export Excel",
    drawConfig: "Draw Configuration",
    format: "Format",
    unassignedPlayers: "Unassigned Players",
    emptyBracket: "Empty Bracket",
    emptyBracketDesc: "Click auto draw or drag players to the bracket to start.",
    loadTemplate: "Load Template",
    schedulingFeature: "Scheduling Feature in Development",
    schedulingFeatureDesc: "The system will automatically schedule based on tables and expected time.",
    configSchedule: "Configure Schedule",
    openingCeremony: "Opening Ceremony",
    groupStage: "Group Stage",
    finalsClosing: "Finals & Closing",
    quarterFinals: "Quarter Finals",
    semiFinals: "Semi Finals",
    final: "Final",
    paid: "Paid",
    unpaid: "Unpaid",
    checkedIn: "Checked-in",
    absent: "Absent",
    carom3c: "Carom 3 Cushion",
    carom1c: "Carom 1 Cushion",
    pool9b: "Pool 9 Ball",
    pool10b: "Pool 10 Ball",
    singleElim: "Single Elimination",
    doubleElim: "Double Elimination",
    groupPlusElim: "Group + Single Elimination",
  },
  vi: {
    dashboard: "Bảng điều khiển",
    tournaments: "Giải đấu",
    schedule: "Lịch thi đấu",
    players: "Cơ thủ",
    clubs: "Câu lạc bộ & Địa điểm",
    settings: "Cài đặt",
    overview: "Tổng quan",
    matches: "Trận đấu",
    brackets: "Sơ đồ thi đấu",
    prizes: "Giải thưởng",
    register: "Đăng ký ngay",
    ongoing: "Đang diễn ra",
    upcoming: "Sắp tới",
    finished: "Đã kết thúc",
    live: "Trực tiếp",
    about: "Về giải đấu",
    systemOnline: "HỆ THỐNG TRỰC TUYẾN",
    welcomeBack: "Chào mừng trở lại, đây là cập nhật hôm nay.",
    mainMenu: "Danh mục chính",
    director: "Giám đốc giải đấu",
    createTournament: "Tạo giải đấu",
    registration: "Đăng ký",
    draw: "Bốc thăm",
    results: "Kết quả",
    venue: "Địa điểm",
    organizer: "Ban tổ chức",
    fee: "Lệ phí",
    deadline: "Hạn đăng ký",
    category: "Nội dung",
    status: "Trạng thái",
    actions: "Thao tác",
    save: "Lưu",
    cancel: "Hủy",
    next: "Tiếp theo",
    back: "Quay lại",
    finish: "Hoàn tất",
    search: "Tìm kiếm",
    filter: "Lọc",
    addPlayer: "Thêm VĐV",
    checkIn: "Điểm danh",
    payment: "Thanh toán",
    seed: "Hạt giống",
    autoDraw: "Bốc thăm tự động",
    generateMatches: "Tạo trận đấu",
    score: "Tỷ số",
    inning: "Lượt cơ",
    avg: "Trung bình",
    highRun: "Series cao nhất",
    winner: "Người thắng",
    table: "Bàn",
    time: "Thời gian",
    featuredEvent: "Sự kiện tiêu biểu",
    prizePool: "Tổng giải thưởng",
    registeredPlayers: "VĐV đã đăng ký",
    aboutTournament: "Về giải đấu",
    sponsors: "Nhà tài trợ",
    allRounds: "Tất cả các vòng",
    liveOnly: "Chỉ trực tiếp",
    viewDetails: "Xem chi tiết",
    bracketsUpdating: "Sơ đồ đang cập nhật",
    bracketsUpdatingDesc: "Sơ đồ thi đấu sẽ hiển thị sau khi kết thúc vòng bốc thăm.",
    refresh: "Làm mới",
    viewAll: "Xem tất cả",
    additionalPrizes: "Giải thưởng phụ",
    rank: "Hạng",
    clubVenue: "Câu lạc bộ / Địa điểm",
    discipline: "Nội dung thi đấu",
    eloRating: "Điểm Elo",
    exportIcal: "Xuất lịch",
    fullCalendar: "Xem lịch đầy đủ",
    trackMatches: "Theo dõi tất cả các trận đấu và sự kiện trong giải.",
    discoverClubs: "Khám phá và quản lý các địa điểm thi đấu trong khu vực.",
    registerClub: "Đăng ký CLB",
    tournamentName: "Tên giải đấu",
    description: "Mô tả",
    startDate: "Ngày bắt đầu",
    endDate: "Ngày kết thúc",
    selectClub: "Chọn Câu lạc bộ",
    tournamentCategories: "Các nội dung thi đấu",
    addCategory: "Thêm nội dung",
    targetPoints: "Điểm mục tiêu",
    readyToLaunch: "Sẵn sàng bắt đầu!",
    readyToLaunchDesc: "Kiểm tra lại các cài đặt và nhấn hoàn tất để xuất bản giải đấu.",
    startTournament: "Bắt đầu giải đấu",
    registrationList: "Danh sách đăng ký",
    exportExcel: "Xuất Excel",
    drawConfig: "Cấu hình bốc thăm",
    format: "Thể thức",
    unassignedPlayers: "VĐV chưa xếp cặp",
    emptyBracket: "Sơ đồ thi đấu trống",
    emptyBracketDesc: "Nhấn nút bốc thăm tự động hoặc kéo thả VĐV vào sơ đồ để bắt đầu.",
    loadTemplate: "Tải sơ đồ mẫu",
    schedulingFeature: "Tính năng xếp lịch đang phát triển",
    schedulingFeatureDesc: "Hệ thống sẽ tự động xếp lịch dựa trên số lượng bàn và thời gian thi đấu dự kiến.",
    configSchedule: "Cấu hình lịch thi đấu",
    openingCeremony: "Lễ khai mạc",
    groupStage: "Vòng bảng",
    finalsClosing: "Chung kết & Bế mạc",
    quarterFinals: "Tứ kết",
    semiFinals: "Bán kết",
    final: "Chung kết",
    paid: "Đã đóng",
    unpaid: "Chưa đóng",
    checkedIn: "Đã có mặt",
    absent: "Vắng mặt",
    carom3c: "Carom 3 Băng",
    carom1c: "Carom 1 Băng",
    pool9b: "Pool 9 Bóng",
    pool10b: "Pool 10 Bóng",
    singleElim: "Loại trực tiếp",
    doubleElim: "Loại kép",
    groupPlusElim: "Vòng bảng + Loại trực tiếp",
  }
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "dark";
    }
    return "dark";
  });

  const [language, setLanguage] = React.useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Language) || "vi";
    }
    return "vi";
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  React.useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
