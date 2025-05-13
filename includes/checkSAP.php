<?php
// Sólo permitimos peticiones AJAX (SPA) que envíen este header:
if (
    empty($_SERVER['HTTP_X_REQUESTED_WITH']) ||
    $_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest'
) {
    // Si no viene por AJAX, terminamos la ejecución
    http_response_code(403);
    exit;
}
