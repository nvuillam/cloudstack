// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { shallowRef, defineAsyncComponent } from 'vue'

export default {
  name: 'accountuser',
  title: 'label.users',
  icon: 'user-outlined',
  docHelp: 'adminguide/accounts.html#users',
  hidden: true,
  permission: ['listUsers'],
  columns: ['username', 'state', 'firstname', 'lastname', 'email', 'account'],
  details: ['username', 'id', 'firstname', 'lastname', 'email', 'usersource', 'timezone', 'rolename', 'roletype', 'account', 'domain', 'created'],
  actions: [
    {
      api: 'createUser',
      icon: 'plus-outlined',
      label: 'label.add.user',
      listView: true,
      popup: true,
      component: shallowRef(defineAsyncComponent(() => import('@/views/iam/AddUser.vue')))
    },
    {
      api: 'updateUser',
      icon: 'edit-outlined',
      label: 'label.edit',
      dataView: true,
      popup: true,
      component: shallowRef(defineAsyncComponent(() => import('@/views/iam/EditUser.vue')))
    },
    {
      api: 'updateUser',
      icon: 'key-outlined',
      label: 'label.action.change.password',
      dataView: true,
      popup: true,
      component: shallowRef(defineAsyncComponent(() => import('@/views/iam/ChangeUserPassword.vue')))
    },
    {
      api: 'registerUserKeys',
      icon: 'file-protect-outlined',
      label: 'label.action.generate.keys',
      message: 'message.generate.keys',
      dataView: true
    },
    {
      api: 'enableUser',
      icon: 'play-circle-outlined',
      label: 'label.action.enable.user',
      message: 'message.enable.user',
      dataView: true,
      show: (record, store) => {
        return ['Admin', 'DomainAdmin'].includes(store.userInfo.roletype) && !record.isdefault &&
          !(record.domain === 'ROOT' && record.account === 'admin' && record.accounttype === 1) &&
          record.state === 'disabled'
      }
    },
    {
      api: 'disableUser',
      icon: 'pause-circle-outlined',
      label: 'label.action.disable.user',
      message: 'message.disable.user',
      dataView: true,
      show: (record, store) => {
        return ['Admin', 'DomainAdmin'].includes(store.userInfo.roletype) && !record.isdefault &&
          !(record.domain === 'ROOT' && record.account === 'admin' && record.accounttype === 1) &&
          record.state === 'enabled'
      }
    },
    {
      api: 'authorizeSamlSso',
      icon: 'form-outlined',
      label: 'Configure SAML SSO Authorization',
      dataView: true,
      popup: true,
      show: (record, store) => {
        return ['Admin', 'DomainAdmin'].includes(store.userInfo.roletype)
      },
      component: shallowRef(defineAsyncComponent(() => import('@/views/iam/ConfigureSamlSsoAuth.vue')))
    },
    {
      api: 'deleteUser',
      icon: 'delete-outlined',
      label: 'label.action.delete.user',
      message: 'message.delete.user',
      dataView: true,
      show: (record, store) => {
        return ['Admin', 'DomainAdmin'].includes(store.userInfo.roletype) && !record.isdefault &&
          !(record.domain === 'ROOT' && record.account === 'admin' && record.accounttype === 1)
      }
    }
  ]
}
