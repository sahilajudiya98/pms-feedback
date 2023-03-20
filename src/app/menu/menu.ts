import { CoreMenu } from "@core/types";

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: "dashboard",
    title: "Dashboard",
    translate: "MENU.DASHBOARD.COLLAPSIBLE",
    type: "item",
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: "home",
    url: "dashboard",
  },
  // Apps & Pages
  // {
  //   id: "apps",
  //   type: "section",
  //   title: "Apps & Pages",
  //   translate: "MENU.APPS.SECTION",
  //   icon: "package",
  //   children: [
  //     {
  //       id: "slider-management",
  //       title: "Slider Management",
  //       translate: "MENU.PAGES.SLIDER",
  //       type: "item",
  //       // icon: 'circle',
  //       url: "slider-management",
  //     },
  //     {
  //       id: "contact-us",
  //       title: "Contact Us",
  //       translate: "MENU.PAGES.CONTACTUS",
  //       type: "item",
  //       // icon: 'circle',
  //       url: "contact-us",
  //       // collapsed: true
  //     },
  //     {
  //       id: "about-us",
  //       title: "About Us",
  //       translate: "MENU.PAGES.ABOUTUS",
  //       type: "item",
  //       // icon: 'circle',
  //       url: "about-us",
  //     },
  //   ],
  // },
  {
    id: "admin",
    title: "Admin",
    translate: "MENU.USERS.COLLAPSIBLE",
    type: "collapsible",
    icon: "user",
    role: ['Admin'],
    children: [
      // {
      //   id: "Admin",
      //   title: "Admin-list",
      //   type: "item",
      //   icon: 'circle',
      //   url: "Admin/admin-list",
      // },
      {
        id: "users",
        title: "Users",
        translate: "MENU.USERS.ADMIN",
        type: "item",
        icon: 'circle',
        url: "Admin/users-list",
      },
      // {
      //   id: "slider",
      //   title: "Slider",
      //   type: "item",
      //   icon: 'circle',
      //   url: "Admin/slider",
      //   // translate: "MENU.USERS.SLIDER",
      // },
      
    ],
  },

  {
    id: "Feedback-Query",
    title: "Feedback-Query",
    // translate: "MENU.FEEDBACK-QUERY.COLLAPSIBLE",
    type: "collapsible",
    icon: "bell",
    children: [
      {
        id: "Query",
        title: "  Query",
        type: "item",
        icon: 'circle',
        // role: ['Admin'],
        url: "feedback-query/query",
      },
      {
        id: "Query-List",
        title: "Query List",
        type: "item",
        icon: 'circle',
        role: ['Admin'],
        url: "feedback-query/query-list",
      },
      {
        id: "Assign-Query",
        title: "Assign Query",
        type: "item",
        icon: 'circle',
        role: ['HR_Manager','Network_Head','Delivery_Manager','Account_Head','HR'],
        department:['HR','NETWORK','ACCOUNT','SALES'],
        url: "feedback-query/assign-query-list",
      },
    ],
  }
];
