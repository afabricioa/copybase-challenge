import axiosClient from "@/axios";
import {defineStore} from "pinia";

export const useFileStore = defineStore('file', {
    state(){
        return {
            dados: {
                registros: [],
                mrrTotal: null,
                churnRate: null
            }
        }
    },

    actions: {
        async uploadArquivo(arquivo){
            const formData = new FormData();
            formData.append('file', arquivo);
            axiosClient.post('/', formData)
                .then((response) => {
                    console.log(response);
                    this.$patch({
                        dados: {
                            churnRate: response.data.churnRate,
                            mrrTotal: response.data.mrrTotal,
                            registros: response.data.registros
                        }
                    })
                })
        }
    }
})