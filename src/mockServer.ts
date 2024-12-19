import {createServer} from 'miragejs';

export function makeServer() {
    createServer({
        routes() {
            this.namespace = 'api';

            this.post('/execute', (_schema, request) => {
                const {language, code} = JSON.parse(request.requestBody);

                if (!code.trim()) {
                    return {
                        status: 'error',
                        error: 'Code cannot be empty.',
                    };
                }

                // Обработка JavaScript
                if (language === 'javascript') {
                    try {
                        let output = '';

                        // Перехват вызовов console.log
                        const consoleLog = (...args: any[]) => {
                            output += args.join(' ') + '\n';
                        };

                        // Создаем функцию с кодом и перехватываем console.log
                        const wrappedCode = `
              (function() {
                const console = { log: ${consoleLog} };
                ${code}
              })();
            `;
                        eval(wrappedCode);

                        return {
                            status: 'success',
                            output: output || 'JavaScript code executed successfully.\n',
                        };
                    } catch (err: unknown) {
                        if (err instanceof Error) {
                            return {
                                status: 'error',
                                error: 'SyntaxError: ' + err.message,
                            };
                        }
                    }
                }

                // Обработка Python
                if (language === 'python') {
                    try {
                        if (/print\(.*\)/.test(code)) {
                            const match = code.match(/print\((.*)\)/);
                            const printContent = eval(match![1]); // Простая эмуляция вывода
                            return {
                                status: 'success',
                                output: String(printContent) + '\n',
                            };
                        }
                        return {
                            status: 'success',
                            output: 'Python code executed successfully.\n',
                        };
                    } catch (err: unknown) {
                        if (err instanceof SyntaxError) {
                            return {
                                status: 'error',
                                error: `SyntaxError: ${err.message}.`,
                            };
                        }
                    }
                }

                return {
                    status: 'error',
                    error: `Execution for language '${language}' is not supported.`,
                };
            });
        },
    });
}
