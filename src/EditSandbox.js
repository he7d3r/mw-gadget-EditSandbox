/* Script para que o link para a página de testes abra a primeira que estiver vazia */
$('#n-testpage').click(function(e){
	e.preventDefault();
	injectSpinner( this, 'testpage' );
	$.ajax({
		url: mw.util.wikiScript( 'api' ),
		dataType: 'json',
		data: {
			'format': 'json',
			'action': 'query',
			'titles': 'Wikipédia:Página de testes/1|Wikipédia:Página de testes/2|Wikipédia:Página de testes/3|Wikipédia:Página de testes/4',
			'prop': 'revisions',
			'rvprop': 'content',
			'indexpageids': '1'
		},
		success: function( data ) {
			var page, query = data.query;
			if ( 'error' in data ) {
				alert( 'Erro da API: ' + data.error.code + '. ' + data.error.info );
			} else if ( query && query.pages && query.pageids ) {
				for( var i = 0; i < query.pageids.length; i++ ){
					page = query.pages[ query.pageids[i] ];
					if( page.revisions[0]['*'].length === 142 ){
						location.href = mw.util.wikiGetlink( page.title ) + '?action=edit';
						return true;
					}
				}
				alert( 'Todas as páginas de teste estão ocupadas' );
			} else {
				alert( 'Houve um erro desconhecido ao consultar a API da Wikipédia' );
			}
		},
		error: function() {
			alert( 'Houve um erro ao usar ajax para obter o conteúdo das páginas de testes.' );
		}
	});
});