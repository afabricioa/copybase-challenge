<!-- eslint-disable no-unused-vars -->
<script setup>
    import {useFileStore} from '../stores/index';
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import { ref, watch, nextTick } from 'vue';

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

    const fileStore = useFileStore();

    const {uploadArquivo} = fileStore;

    async function selectFile(event){
        uploadArquivo(event.target.files[0]);
    }

    let model = ref({
        registros: [],
        mrrTotal: null,
        churnRate: null
    }); 

    watch(fileStore.dados, async () => {
        model.value = {
            ...JSON.parse(JSON.stringify(fileStore.dados))
        };

        await nextTick();

        console.log(model.value);
    });
    console.log(model.value)
    const dataGrafico = {
        labels: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maior', 'Junho', 'Julho' ],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

</script>

<template>
    <v-container class="h-[100vh]">
        <div class="flex justify-center items-center w-[100%]">
            <v-file-input
                show-size
                label="Carregar o Arquivo"
                variant="solo"
                @change="selectFile"
                class="max-w-[300px]"
                ></v-file-input>
        </div>
        <!-- <Bar
            id="my-chart-id"
            :data="dataGrafico"
        /> -->
        <div v-if="model.churnRate && model.mrrTotal" class="metricas">
            <div class="bg-[#222222] w-[250px] flex justify-center p-4 rounded font-bold text-white text-lg shadow-lg">MRR: {{ `R$${model.mrrTotal}` }}</div>
            <div class="bg-[#222222] w-[250px] flex justify-center p-4 rounded font-bold text-white text-lg shadow-lg">Churn Rate: {{ `${model.churnRate}%` }}</div>
        </div>
    </v-container>
</template>