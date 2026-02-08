{% if config.password_protect and config.password_hash %}
<script>window.BLOG_PASS_HASH="{{ config.password_hash }}";</script>
<script src="{{ config.root }}js/password-gate.js"></script>
{% endif %}
