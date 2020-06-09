export default {
     // 1. 全局语言
     user: {
          username: '', // 用户名
          avatar_address: '', // 头像地址
          label: '', // 标签
          weight: '', // 权重
          id: '' // id
     },
     all_pages_router: [
          [{
                    title: "用户操作",
                    limit:['1','2'],
                    children: [{
                         path: "/person_set/to_update_person",
                         name: "修改信息",
                         limit: ['1', '2']
                    }, ]
               },
               {
                    title: "权限管理",
                    limit:['1','2'],
                    children: [{
                         path: "/person_set/admin_set",
                         name: "超级管理员",
                         limit: ['1']
                    }]
               }
          ],
          [{
                    title: "用户操作",
                    limit:['1','2'],
                    children: [{
                         path: "/person_set/to_update_person",
                         name: "修改信息",
                         limit: ['1', '2']
                    }, ]
               },
               {
                    title: "权限管理",
                    limit:['1','2'],
                    children: [{
                         path: "/person_set/admin_set",
                         name: "超级管理员",
                         limit: ['1']
                    }]
               }
          ],
          [{
                    title: "用户操作",
                    limit:['1','2'],
                    children: [{
                         path: "/person_set/to_update_person",
                         name: "修改信息",
                         limit: ['1', '2']
                    }, ]
               },
               {
                    title: "权限管理",
                    limit:['1'],
                    children: [{
                         path: "/person_set/admin_set",
                         name: "超级管理员",
                         limit: ['1']
                    }]
               }
          ]
     ]
}