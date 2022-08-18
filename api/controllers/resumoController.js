const database  = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op

class ResumoController {
    static async listarResumoAnoMes(req, res){
		const { ano, mes } = req.params
		const where = {}
        
		ano || mes ? where.data = {} : null; 
		ano || mes ? where.data[Op.startsWith] = `${ano}-${mes}` : null;

        const resumoReceitas = await database.Receitas.findAll({where});
        const resumoDespesas = await database.Despesas.findAll({where});

		try {
            let somaReceitas = new Array();
            let somaDespesas = new Array();
            let resultadoFinal = new Array();
            let categoriaDespesas = new Array();
            let mediaReceitas;
            let mediaDespesas;
            
            somaReceitas = resumoReceitas.map((resumo)=> resumo.valor);
            somaDespesas = resumoDespesas.map((resumo)=> resumo.valor);
            categoriaDespesas = resumoDespesas.map((resumo) => resumo.categoria);

            function soma(valor, string){
                let media = '';
                for (let i = 0; i < valor.length; i++) {
                    media = Number(media) + Number(valor[i]);           
                }

                if (string === 'Receita') {
                    mediaReceitas = media;
                }else {
                    mediaDespesas = media;
                }

                media === '' ? media = 0 : media = media
                
                resultadoFinal.push(`Valor total de ${string} no mês: ${media}`);
            }

            function subtracao(valor1, valor2){
                const media = valor1 - valor2;
                resultadoFinal.push(`Saldo final no mês: ${media}`);
            }

            let lazer = new Array();
            let alimentacao = new Array();
            let saude = new Array();
            let moradia = new Array();
            let transporte = new Array();
            let imprevistos = new Array();
            let educacao = new Array();
            let outras = new Array();

            for (let i = 0; i < categoriaDespesas.length; i++){
                let supp = categoriaDespesas[i];
                switch (supp) {
                    case 'Lazer':
                        const categoriaLazer = new Array(resumoDespesas[i]);
                        lazer.push(categoriaLazer.map((resumo) => resumo.valor));
                        break;
                    case 'Alimentação':
                        const categoriaAlimentacao = new Array(resumoDespesas[i]);
                        alimentacao.push(categoriaAlimentacao.map((resumo) => resumo.valor));
                        break; 
                    case 'Saúde':
                        const categoriaSaude = new Array(resumoDespesas[i]);
                        saude.push(categoriaSaude.map((resumo) => resumo.valor));
                        break;
                    case 'Moradia':
                        const categoriaMoradia = new Array(resumoDespesas[i]);
                        moradia.push(categoriaMoradia.map((resumo) => resumo.valor));
                        break;
                    case 'Transporte':
                        const categoriaTransporte = new Array(resumoDespesas[i]);
                        transporte.push(categoriaTransporte.map((resumo) => resumo.valor));
                        break;
                    case 'Imprevistos':
                        const categoriaImprevistos = new Array(resumoDespesas[i]);
                        imprevistos.push(categoriaImprevistos.map((resumo) => resumo.valor));
                        break;
                    case 'Educação':
                        const categoriaEducacao = new Array(resumoDespesas[i]);
                        educacao.push(categoriaEducacao.map((resumo) => resumo.valor));
                        break;
                    case 'Outras':
                        const categoriaOutras = new Array(resumoDespesas[i]);
                        outras.push(categoriaOutras.map((resumo) => resumo.valor));
                        break;
                    default:
                        break;
                }
            }
            soma(somaReceitas, 'Receita');
            soma(somaDespesas, 'Despesa');
            subtracao(mediaReceitas, mediaDespesas);
            soma(lazer, 'gastos na categoria Lazer');
            soma(alimentacao, 'gastos na categoria Alimentação');
            soma(saude, 'gastos na categoria Saúde');
            soma(moradia, 'gastos na categoria Moradia');
            soma(transporte, 'gastos na categoria Transporte');
            soma(imprevistos, 'gastos na categoria Imprevistos');
            soma(educacao, 'gastos na categoria Educação');
            soma(outras, 'gastos na categoria Outras');

            return res.status(200).json(resultadoFinal);

		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
}

module.exports = ResumoController;