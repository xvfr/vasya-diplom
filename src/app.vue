<template>
  <q-layout class="bg-grey-2">
	<q-header class="bg-white">
	  <q-toolbar>

		<q-avatar size="xl" class="q-mt-sm"><q-img alt="logo" src="./assets/mason.svg" /></q-avatar>
		<q-toolbar-title class="text-black">Система мониторинга окружающей среды</q-toolbar-title>

		<q-btn flat text-color="black">Регистрация</q-btn>
		<q-btn color="grey" text-color="white">Войти</q-btn>
		<q-btn class="q-ml-md" color="black" flat round dense icon="view_in_ar" />

	  </q-toolbar>
	</q-header>

	<q-page-container>
	  <router-view></router-view>
	</q-page-container>
  </q-layout>
</template>